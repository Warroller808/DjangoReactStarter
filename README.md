Backend: Django 5
JWT authentication
CustomUser model with email as key

Frontend: React.JS 18

DEPLOIEMENT VPS:

```
sudo apt update && sudo apt upgrade
```

Voir documentation docker pour install de docker engine (installer le répertoire apt puis installer engine, cli, compose, etc)

```
sudo systemctl enable docker.service
sudo systemctl enable containerd.service
```

Si le service ne se lance pas:

```
systemctl start docker
```

```
sudo groupadd docker
sudo usermod -aG docker ubuntu
ssh-keygen -t ed25519 -C "youremailaddress@email.fr"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
cat ~/.ssh/id_ed25519.pub
```

Ajouter la clé dans github:

```
git remote set-url origin githublink
```

```
cd /opt
mkdir DjangoReactStarter
sudo chown -R ubuntu:www-data /opt/DjangoReactStarter
sudo chmod -R 755 /opt/DjangoReactStarter
cd DjangoReactStarter
git clone urlssh .
```

Créer le fichier .env à la racine du projet à côté du compose.yaml, avec les mdp et infos sensibles

```
sudo mkdir traefik
cd traefik
sudo nano compose.yml
sudo docker network create traefik-public
sudo docker network ls
sudo docker compose up -d
```

Retour dans DjangoReactStarter:
```
sudo docker compose build
sudo docker compose up -d
sudo docker compose exec backend python manage.py migrate
sudo docker compose exec backend python createsuperuser
```