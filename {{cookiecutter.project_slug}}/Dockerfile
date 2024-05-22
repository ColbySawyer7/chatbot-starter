# Use python:3.11-slim as the base image for both build and final stages
FROM python:3.11-slim as base

# Set the working directory
WORKDIR /code

# Install poetry without creating a virtual environment
# Combine RUN commands to reduce layers and improve caching
RUN pip install poetry==1.6.1 && \
    poetry config virtualenvs.create false

# Copy the necessary project files
COPY ./pyproject.toml ./README.md ./poetry.lock* ./requirements.txt ./

# Install dependencies using pip and poetry
# Combining poetry add with install can sometimes cause issues, so we separate them
RUN pip install -r requirements.txt && \
    poetry install --no-interaction --no-ansi --no-root

# Copy the rest of the application
COPY . /app

# Final stage uses a clean Python slim image
FROM python:3.11-slim

# Set the working directory for the application
WORKDIR /app

# Copy only the necessary artifacts from the base stage
COPY --from=base /app /app
COPY --from=base /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=base /usr/local/bin /usr/local/bin

EXPOSE 8000

# Command to run the application
CMD ["uvicorn", "--host", "0.0.0.0", "--port", "8000", "main:app"]
