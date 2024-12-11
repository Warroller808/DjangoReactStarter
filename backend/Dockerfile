# Utiliser une image Python
FROM python:3.10

# Installer les bibliothèques système nécessaires
RUN apt-get update && apt-get install -y \
    postgresql-client \
    python3-pip \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de requirements
COPY requirements.txt /app/

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Copier le reste des fichiers de l'application
COPY . /app/

# Exposer le port sur lequel l'application va tourner
EXPOSE 8000

# Commande pour démarrer le serveur Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
