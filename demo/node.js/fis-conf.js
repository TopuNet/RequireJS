// default settings. fis3 release
// fis.set('project.charset', 'utf8');
// fis.set('project.fileType.text', 'htm');
fis.set('project.ignore', ['/fis-conf.js', '/attach.zip', '/web.config', '/iisnode/**', '/css/**.less', '/node_modules/**']);

// Global start

// fis.match('::packager', {
//     postpackager: fis.plugin('loader', {
//         // allInOne: true
//     })
// });

//fis.match('*.less', {
//    parser: fis.plugin('less'),
//    rExt: '.css',
//    packTo: '/static/aio.css',
//    optimizer: fis.plugin('clean-css')

//});

fis.match('/css/**.css', {
    packTo: '/static/aio.css',
    release: '/source$0'
});

fis.match('/css/**.css.map', {
    release: '/static$0'
});

fis.match('/widget/**', {
    release: false
});

fis.match('{/widget/main.js,/widget/aio.js}', {
    release: '/$0'
});

fis.match('{/static/**,/widget/aio.js}', {
    useHash: true
});

fis.match('/images/**', {
    useHash: true,
    release: '/static$0'
});

fis.match('/static/**.png', {
    optimizer: fis.plugin('png-compressor')
});

// Global end

// Publish
fis.media('pub').match('/images/**', {
    useHash: true,
    release: '/static$0',
    url: '/static$0',
    domain: 'http://www.51icb.com'
});

fis.media('pub').match('/widget/**.js', {
    optimizer: fis.plugin('uglify-js')
});

fis.media('pub').match('/css/**.css', {
    optimizer: fis.plugin('clean-css')
});

fis.media('pub').match('{/static/**,/inc/*.js,/inc/*.css}', {
    useHash: true,
    url: '$0',
    domain: 'http://www.51icb.com'
});
