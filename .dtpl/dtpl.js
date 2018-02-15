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
                name: './file/modify-api.ts.dtpl',
                matches: function () { return s.basicData.dirPath.indexOf('/modify/api/') >= 0; }
            }
        ],
        globalData: {}
    };
}
exports["default"] = default_1;
