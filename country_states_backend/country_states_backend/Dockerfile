FROM python:3.9.6 as base
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
WORKDIR /app
COPY requirements .

FROM base as development
RUN pip install --no-cache-dir -r requirements/base.txt
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

FROM base as production
COPY . /app
RUN pip install --no-cache-dir -r requirements/prod.txt
RUN python manage.py collectstatic --noinput
CMD ["gunicorn", "country_states_backend.wsgi:application", "--bind", "0.0.0.0:8000"]

