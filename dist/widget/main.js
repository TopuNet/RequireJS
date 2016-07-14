
requirejs.config({
    // baseUrl: '/widget',
    // paths: {
    //     "test": "app/test"
    // },
    //     shim: {
    //         "test": {
    //             exports: "test"
    //         }
    //     }
});

__inline('fis_inline.js')

function __inline() {
    require(["app"]);
}
