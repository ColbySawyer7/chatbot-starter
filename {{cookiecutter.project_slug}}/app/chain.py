import os
# import LangChain dependencies
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain.schema import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_community.llms import Ollama

intro = """
Hello I am a chatbot
"""

# Setup the model for generating responses
_model = Ollama(
    model="llama3"
)

_prompt = ChatPromptTemplate.from_messages([
    ("system", intro),
    ("human", "Question: {question}")
])

# Chain Setup
chain = (
    {"question": RunnablePassthrough()}
    | _prompt
    | _model
    | StrOutputParser()
)


