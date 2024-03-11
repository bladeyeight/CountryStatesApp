FROM python:3.9.6 as base
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
WORKDIR /app
COPY . /app

FROM base as development
RUN pip install --no-cache-dir -r requirements.txt
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

FROM base as production
RUN pip install --no-cache-dir -r requirements.txt

CMD ["gunicorn", "country_states_backend.wsgi:application", "--bind", "0.0.0.0:8000"]

