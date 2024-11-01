AL DESCARGAR DEL REPOSITORIO REMOTO DE GITHUB HACER LOS SIGUIENTE:

1. Borrar la carpeta que diga "venv" (o similar)
2. En la terminal poner los comandos:

	python -m venv venv

	venv\scripts\activate

	pip install -r Requeriments.txt

3. Abrir 2 terminales

4. La primera terminal estando en la ruta de backend:  ..\projectMikhuy\backend
Poner los siguientes comandos:

	pyhton manage.py runserver

Esto inicial el servidor del backend, cuando quieran temrinarlo pulsan CTRL+C. Por ahora no lo terminen

5. La segunda terminal estando en la ruta de frontend:   ..\projectMikhuy\frontend\frontMikhuy
Poner los siguiente comandos:

	npm install	

	npm install axios

	npm run dev   //Esto inicia el servidor de frontend

Con los 2 servidores activos ya deberían poder ver las páginas.