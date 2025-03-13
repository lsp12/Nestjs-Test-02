# Usar una imagen base oficial de Node.js
FROM node:20

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos de dependencias y luego instalar las dependencias
COPY tsconfig.json ./
COPY package*.json ./
RUN npm install

# Construir la aplicación
RUN npm run build

# Copiar el resto del código de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto que la aplicación utilizará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]
