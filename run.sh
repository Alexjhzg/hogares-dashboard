#!/bin/bash
cd /home/seem/Documentos/_proyectos/api-kobo-encuesta-ampliada
export PYTHONPATH=$PYTHONPATH:$(pwd)/backend
./.venv/bin/python3 -m app.main
