import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'standalone',

    async redirects() {
        return [
            {
                // Quando alguém aceder à rota principal...
                source: '/',
                // ...envie-o para a rota /leads e MUDE a URL no navegador.
                destination: '/leads',
                permanent: true, // Diz aos navegadores que esta é uma mudança permanente.
            },
        ]
    },

};

export default nextConfig;
