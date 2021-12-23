/**
 * @type {import('next').NextConfig}
 **/

module.exports = {
    images: {
        domains: ['ucarecdn.com', 'asset.kompas.com', 'web.kominfo.go.id']
    },
    swcMinify: true,
    experimental: {
        // ssr and displayName are configured by default
        styledComponents: true
    }
}