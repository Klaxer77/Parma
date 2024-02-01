FROM python:3.10

WORKDIR /usr/src/app


ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y netcat-traditional
RUN apt-get install -y --no-install-recommends postgresql gcc python3 musl-dev
RUN pip install --upgrade pip

COPY ./req.txt .
RUN pip install -r req.txt

COPY ./entrypoint.sh .

COPY . .

ENTRYPOINT ["/usr/src/app/entrypoint.sh"]