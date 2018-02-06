"use strict";
exports.__esModule = true;
function default_1(s) {
    return {
        templates: [
            {
                name: './component',
                matches: function () { return s.isDirectory && /^components?$/.test(s.basicData.dirName); }
            },
            {
                name: './page',
                matches: function () { return s.isDirectory && /^pages?$/.test(s.basicData.dirName); }
            },
            {
                name: './file/gen-tel.ts.dtpl',
                matches: function () { return s.basicData.dirPath.indexOf('/gen-tpl/') >= 0; }
            }
        ],
        globalData: {}
    };
}
exports["default"] = default_1;
