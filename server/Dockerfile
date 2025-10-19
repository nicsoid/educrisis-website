# Використовуємо офіційний образ Python
FROM python:3.11-slim

# Встановлюємо робочу директорію в контейнері
WORKDIR /usr/src/app

# Копіюємо requirements.txt для встановлення залежностей
# Примітка: Оскільки у вас немає requirements.txt, ми створюємо його в наступному кроці.
# Для цього прикладу, ми будемо вважати, що залежності: Flask, flask-cors, mysql-connector-python
COPY requirements.txt .

# Встановлюємо залежності
RUN pip install --no-cache-dir -r requirements.txt

# Копіюємо всі файли проекту до контейнера
COPY . .

# Визначаємо змінну оточення, щоб Flask знав, який файл запускати
ENV FLASK_APP=WayForPay_Backend_Server.py

# Відкриваємо порт 5000, на якому працює Flask
EXPOSE 5000

# Команда для запуску Flask-додатку
CMD ["flask", "run", "--host=0.0.0.0"]