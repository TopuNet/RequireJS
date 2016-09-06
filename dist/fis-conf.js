// default settings. fis3 release
// fis.set('project.charset', 'utf8');
// fis.set('project.fileType.text', 'htm');
fis.set('project.ignore', ['/fis-conf.js', '/web.config', '/iisnode/**', '/css/**.less', '/node_modules/**']);

// Global start
fis.match('/css/**.css', {
    release: '/static$0',
    useHash: true
});

fis.match('/css/**.css.map', {
    release: '/static$0'
});

fis.match('/widget/**', {
    release: false
});

// fis.match('/widget/main.js', {
//     release: '/static$0'
// });

fis.match('/widget/aio.js', {
    release: '/static$0',
    useHash: true
});

fis.match('/images/**', {
    release: '/static$0',
    useHash: true
});

fis.match('/images/**.png', {
    optimizer: fis.plugin('png-compressor')
});
// Global end

// Publish start
fis.media('pub').match('/inc/**',{
    url: '$0',
    domain: 'http://static.topu.net/f'
});

fis.media('pub').match('{/css/**,/images/**,/widget/**}', {
    url: '$0',
    domain: 'http://static.topu.net/f/static'
});

fis.media('pub').match('/widget/**.js', {
    optimizer: fis.plugin('uglify-js')
});

fis.media('pub').match('/css/**.css', {
    optimizer: fis.plugin('clean-css')
});
// Publish end
