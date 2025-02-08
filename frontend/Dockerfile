# Utiliser l'image Nginx comme base
FROM nginx:alpine

# Copier les fichiers de ton frontend dans le répertoire Nginx
COPY ./frontend /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Nginx va démarrer automatiquement
CMD ["nginx", "-g", "daemon off;"]
