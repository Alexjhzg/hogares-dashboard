export function parseDemographics(r, formType) {
    let totalPers = 0;
    let totalHombres = 0;
    let totalMujeres = 0;

    // Prioritize lista_hogar (ESCA V4 and EHM V3/V4), fallback to datos_hogar/hogar (ESCA V3)
    const hogaresRaw = Array.isArray(r['lista_hogar'])
        ? r['lista_hogar']
        : (Array.isArray(r['datos_hogar/hogar']) ? r['datos_hogar/hogar'] : []);

    hogaresRaw.forEach(h => {
        const miembros = Array.isArray(h['lista_hogar/lista_miembros'])
            ? h['lista_hogar/lista_miembros']
            : (Array.isArray(h['datos_hogar/hogar/integrantes_hogar']) ? h['datos_hogar/hogar/integrantes_hogar'] : []);

        if (miembros.length > 0) {
            totalPers += miembros.length;
        } else {
            const count = parseInt(
                h['lista_hogar/personas_hogar'] ||
                h['lista_hogar/lista_miembros_count'] ||
                h['datos_hogar/hogar/integrantes_hogar_count'] || '0',
                10
            );
            if (!isNaN(count)) totalPers += count;
        }

        miembros.forEach(m => {
            const { hCount, mCount } = getGenderFromMiembro(m);
            totalHombres += hCount;
            totalMujeres += mCount;
        });
    });

    return { totalPers, totalHombres, totalMujeres, hogaresCount: hogaresRaw.length, hogaresRaw };
}

function getGenderFromMiembro(m) {
    let hCount = 0, mCount = 0;
    const sexoKey = Object.keys(m).find(k => k.endsWith('/sexo') || k.endsWith(':sexo') || k === 'sexo' || k.endsWith('/C2'));
    if (sexoKey) {
        const sexo = String(m[sexoKey]).trim().toLowerCase();
        // Standardized mapping: 1 -> Hombre / Masculino, 2 -> Mujer / Femenino
        if (['1', 'sexo1', 'v', 'm', 'masculino', 'hombre'].includes(sexo)) hCount = 1;
        if (['2', 'sexo2', 'h', 'f', 'femenino', 'mujer'].includes(sexo)) mCount = 1;
    }
    return { hCount, mCount };
}
