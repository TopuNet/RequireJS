// default settings. fis3 release
// fis.set('project.charset', 'utf8');
// fis.set('project.fileType.text', 'htm');
fis.set('project.ignore', ['/fis-conf.js', '/web.config', '/iisnode/**', '/css/**.less', '/images/bak/**', '/**/**.cs', '/mobile/css/**.less', 'mobile/images/showcase/**', '/node_modules/**', '/server.log', '/package*.*', 'pcApplication.*', 'server.log']);
fis.config.set('settings.optimizer.uglify-js', {
    mangle: false // 不混淆
});

// Global start

fis.match('(**)(/css/**.css)', {
    release: '$1/static/$2',
    useHash: true
});

fis.match('(**)(/css/**.css.map)', {
    release: '$1/static/$2'
});

fis.match('(**)/widget/**', {
    release: false
});

fis.match('(**)(/widget/aio.js)', {
    release: '$1/static/$2',
    useHash: true
});

fis.match('(**)(/images/**)', {
    release: '$1/static/$2',
    useHash: true
});

// wap

// fis.match('/mobile(/css/**.css)', {
//     release: '/mobile/static$1',
//     useHash: true
// });

// fis.match('/mobile(/css/**.css.map)', {
//     release: '/mobile/static$1'
// });

// fis.match('/mobile/widget/**', {
//     release: false
// });

// fis.match('/mobile(/widget/aio.js)', {
//     release: '/mobile/static$1',
//     useHash: true
// });

// fis.match('/mobile(/images/**)', {
//     release: '/mobile/static$1',
//     useHash: true
// });

// Global end

// Publish start

fis.media('pub').match('/app_maxAge.js', {
    release: false
});

fis.media('pub').match('/app_maxAge_pub.js', {
    release: '/app_maxAge.js'
});

// pc

fis.media('pub').match('/inc/**', {
    url: '$0',
    domain: 'http://www.topu.net/new'
});

fis.media('pub').match('{/css/**,/images/**,/widget/**}', {
    url: '$0',
    domain: 'http://www.topu.net/new/static'
});

fis.media('pub').match('/widget/**.js', {
    optimizer: fis.plugin('uglify-js')
});

fis.media('pub').match('/css/**.css', {
    optimizer: fis.plugin('clean-css')
});

// wap

fis.media('pub').match('/mobile/inc/**', {
    url: '$0',
    domain: 'http://www.topu.net/new/mobile'
});

fis.media('pub').match('{/mobile(/css/**),/mobile(/images/**),/mobile(/widget/**)}', {
    url: '$1',
    domain: 'http://www.topu.net/new/mobile/static'
});

fis.media('pub').match('/mobile/widget/**.js', {
    optimizer: fis.plugin('uglify-js')
});

fis.media('pub').match('/mobile/css/**.css', {
    optimizer: fis.plugin('clean-css')
});

// Publish end