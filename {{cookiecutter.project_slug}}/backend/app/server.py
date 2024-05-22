from fastapi import FastAPI, APIRouter
from fastapi.responses import RedirectResponse
from langserve import add_routes
from app.chain import chain as chat_chain
from fastapi.responses import JSONResponse
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse
from starlette.requests import Request
import logging as logger


def create_app():
    app = FastAPI(
        title="{{cookiecutter.project_name}}",
        openapi_url="/app/v1/openapi.json",
        docs_url="/docs/",
        description="{{cookiecutter.project_name}} chatbot, enabling conversations with IoT data.",
        redoc_url=None,
    )
    setup_routers(app)
    setup_cors_middleware(app)
    serve_static_app(app)
    return app

def setup_routers(app: FastAPI) -> None:
    @app.get("/")
    async def redirect_root_to_docs():
        return RedirectResponse("/docs")

    # Edit this to add the chain you want to add
    add_routes(app, chat_chain, path="/chat")
    
def serve_static_app(app):
    app.mount("/", StaticFiles(directory="static"), name="static")

    @app.middleware("http")
    async def _add_404_middleware(request: Request, call_next):
        """Serves static assets on 404"""
        response = await call_next(request)
        path = request["path"]
        if path.startswith("/api/v1") or path.startswith("/docs"):
            return response
        if response.status_code == 404:
            return FileResponse("static/index.html")
        return response
    
def setup_cors_middleware(app):
    origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000"
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        expose_headers=["Content-Range", "Range"],
        allow_headers=["Authorization", "Range", "Content-Range"],
    )