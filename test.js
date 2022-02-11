// import * as libSourceMaps from 'istanbul-lib-source-maps'
const libSourceMaps = require('istanbul-lib-source-maps')
const libCoverage = require('istanbul-lib-coverage')
// const {formatCoverage} = require("./src/utils");
function remapCoverage(obj, codePath) {
  // sourcMap这边要把codePath加上！！！！！
  return libSourceMaps
    .createSourceMapStore()
    .transformCoverage(libCoverage.createCoverageMap(obj))
    .then((res) => {
      const { data } = res
      const o = {}
      // 有sourcMap的覆盖率对象会把前缀codePath删掉，所以要匹配加回来
      for (const dataKey in data) {
        let r = dataKey
        if (dataKey.match(codePath)) {
        } else {
          r = codePath + dataKey
        }
        o[r] = data[dataKey]['data']
      }
      return o
    })
}

let a = [
  {
    path: 'dest/page/home-page/index.js',
    statementMap: [
      {
        start: {
          line: 2,
          column: 0,
        },
        end: {
          line: 2,
          column: 62,
        },
      },
      {
        start: {
          line: 3,
          column: 14,
        },
        end: {
          line: 3,
          column: 30,
        },
      },
      {
        start: {
          line: 4,
          column: 14,
        },
        end: {
          line: 4,
          column: 35,
        },
      },
      {
        start: {
          line: 5,
          column: 20,
        },
        end: {
          line: 5,
          column: 42,
        },
      },
      {
        start: {
          line: 6,
          column: 16,
        },
        end: {
          line: 6,
          column: 38,
        },
      },
      {
        start: {
          line: 7,
          column: 23,
        },
        end: {
          line: 7,
          column: 59,
        },
      },
      {
        start: {
          line: 8,
          column: 22,
        },
        end: {
          line: 8,
          column: 56,
        },
      },
      {
        start: {
          line: 9,
          column: 15,
        },
        end: {
          line: 9,
          column: 36,
        },
      },
      {
        start: {
          line: 10,
          column: 29,
        },
        end: {
          line: 10,
          column: 71,
        },
      },
      {
        start: {
          line: 13,
          column: 8,
        },
        end: {
          line: 13,
          column: 21,
        },
      },
      {
        start: {
          line: 14,
          column: 8,
        },
        end: {
          line: 14,
          column: 50,
        },
      },
      {
        start: {
          line: 15,
          column: 8,
        },
        end: {
          line: 15,
          column: 54,
        },
      },
      {
        start: {
          line: 16,
          column: 8,
        },
        end: {
          line: 26,
          column: 10,
        },
      },
      {
        start: {
          line: 17,
          column: 12,
        },
        end: {
          line: 25,
          column: 13,
        },
      },
      {
        start: {
          line: 19,
          column: 58,
        },
        end: {
          line: 19,
          column: 65,
        },
      },
      {
        start: {
          line: 20,
          column: 20,
        },
        end: {
          line: 20,
          column: 54,
        },
      },
      {
        start: {
          line: 22,
          column: 20,
        },
        end: {
          line: 22,
          column: 38,
        },
      },
      {
        start: {
          line: 24,
          column: 20,
        },
        end: {
          line: 24,
          column: 26,
        },
      },
      {
        start: {
          line: 27,
          column: 8,
        },
        end: {
          line: 27,
          column: 46,
        },
      },
      {
        start: {
          line: 28,
          column: 8,
        },
        end: {
          line: 31,
          column: 11,
        },
      },
      {
        start: {
          line: 34,
          column: 8,
        },
        end: {
          line: 34,
          column: 31,
        },
      },
      {
        start: {
          line: 37,
          column: 8,
        },
        end: {
          line: 37,
          column: 100,
        },
      },
      {
        start: {
          line: 38,
          column: 8,
        },
        end: {
          line: 43,
          column: 17,
        },
      },
      {
        start: {
          line: 40,
          column: 12,
        },
        end: {
          line: 40,
          column: 51,
        },
      },
      {
        start: {
          line: 42,
          column: 12,
        },
        end: {
          line: 42,
          column: 36,
        },
      },
      {
        start: {
          line: 48,
          column: 39,
        },
        end: {
          line: 48,
          column: 49,
        },
      },
      {
        start: {
          line: 49,
          column: 8,
        },
        end: {
          line: 49,
          column: 55,
        },
      },
      {
        start: {
          line: 51,
          column: 8,
        },
        end: {
          line: 52,
          column: 104,
        },
      },
      {
        start: {
          line: 55,
          column: 0,
        },
        end: {
          line: 55,
          column: 36,
        },
      },
    ],
    fnMap: [
      {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 12,
            column: 4,
          },
          end: {
            line: 12,
            column: 5,
          },
        },
        loc: {
          start: {
            line: 12,
            column: 23,
          },
          end: {
            line: 32,
            column: 5,
          },
        },
        line: 12,
      },
      {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 16,
            column: 31,
          },
          end: {
            line: 16,
            column: 32,
          },
        },
        loc: {
          start: {
            line: 16,
            column: 54,
          },
          end: {
            line: 26,
            column: 9,
          },
        },
        line: 16,
      },
      {
        name: '(anonymous_2)',
        decl: {
          start: {
            line: 33,
            column: 4,
          },
          end: {
            line: 33,
            column: 5,
          },
        },
        loc: {
          start: {
            line: 33,
            column: 16,
          },
          end: {
            line: 35,
            column: 5,
          },
        },
        line: 33,
      },
      {
        name: '(anonymous_3)',
        decl: {
          start: {
            line: 36,
            column: 4,
          },
          end: {
            line: 36,
            column: 5,
          },
        },
        loc: {
          start: {
            line: 36,
            column: 24,
          },
          end: {
            line: 44,
            column: 5,
          },
        },
        line: 36,
      },
      {
        name: '(anonymous_4)',
        decl: {
          start: {
            line: 38,
            column: 19,
          },
          end: {
            line: 38,
            column: 20,
          },
        },
        loc: {
          start: {
            line: 38,
            column: 25,
          },
          end: {
            line: 43,
            column: 9,
          },
        },
        line: 38,
      },
      {
        name: '(anonymous_5)',
        decl: {
          start: {
            line: 45,
            column: 4,
          },
          end: {
            line: 45,
            column: 5,
          },
        },
        loc: {
          start: {
            line: 45,
            column: 27,
          },
          end: {
            line: 45,
            column: 30,
          },
        },
        line: 45,
      },
      {
        name: '(anonymous_6)',
        decl: {
          start: {
            line: 46,
            column: 4,
          },
          end: {
            line: 46,
            column: 5,
          },
        },
        loc: {
          start: {
            line: 46,
            column: 23,
          },
          end: {
            line: 46,
            column: 26,
          },
        },
        line: 46,
      },
      {
        name: '(anonymous_7)',
        decl: {
          start: {
            line: 47,
            column: 4,
          },
          end: {
            line: 47,
            column: 5,
          },
        },
        loc: {
          start: {
            line: 47,
            column: 13,
          },
          end: {
            line: 53,
            column: 5,
          },
        },
        line: 47,
      },
    ],
    branchMap: [
      {
        loc: {
          start: {
            line: 17,
            column: 12,
          },
          end: {
            line: 25,
            column: 13,
          },
        },
        type: 'switch',
        locations: [
          {
            start: {
              line: 18,
              column: 16,
            },
            end: {
              line: 20,
              column: 54,
            },
          },
          {
            start: {
              line: 21,
              column: 16,
            },
            end: {
              line: 22,
              column: 38,
            },
          },
          {
            start: {
              line: 23,
              column: 16,
            },
            end: {
              line: 24,
              column: 26,
            },
          },
        ],
        line: 17,
      },
      {
        loc: {
          start: {
            line: 19,
            column: 28,
          },
          end: {
            line: 19,
            column: 41,
          },
        },
        type: 'default-arg',
        locations: [
          {
            start: {
              line: 19,
              column: 39,
            },
            end: {
              line: 19,
              column: 41,
            },
          },
        ],
        line: 19,
      },
      {
        loc: {
          start: {
            line: 19,
            column: 43,
          },
          end: {
            line: 19,
            column: 53,
          },
        },
        type: 'default-arg',
        locations: [
          {
            start: {
              line: 19,
              column: 51,
            },
            end: {
              line: 19,
              column: 53,
            },
          },
        ],
        line: 19,
      },
    ],
    s: [
      3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 3, 3, 6, 3, 3, 2, 2,
      3, 3, 3, 3,
    ],
    f: [3, 0, 6, 3, 2, 0, 0, 3],
    b: [[0, 0, 0], [0], [0]],
    inputSourceMap: {
      version: 3,
      file: 'index.js',
      sourceRoot: '',
      sources: ['../../../src/page/home-page/index.tsx'],
      names: [],
      mappings:
        ';;AAAA,+BAA+B;AAC/B,oCAA4C;AAC5C,2CAAgD;AAChD,uCAAmD;AACnD,4DAAqD;AAErD,yDAA4D;AAC5D,qCAAmE;AACnE,wEAA8F;AAM9F,MAAqB,iBAAkB,SAAQ,UAAY;IAIzD,YAAY,KAAa;QACvB,KAAK,CAAC,KAAK,CAAC,CAAC;QAJP,aAAQ,GAAG,gBAAS,CAAC,QAAQ,CAAC;QAC9B,eAAU,GAAG,kBAAW,CAAC,QAAQ,CAAC;QA4B1C,oBAAe,GAAG,CAAC,EAAE,IAAI,EAAE,OAAO,EAAW,EAAE,EAAE;YAC/C,QAAQ,IAAI,EAAE;gBACZ,KAAK,oBAAa,CAAC,IAAI;oBACrB,MAAM,EAAE,QAAQ,GAAG,EAAE,EAAE,KAAK,GAAG,EAAE,EAAE,GAAG,OAAqB,CAAC;oBAC5D,OAAO,IAAI,CAAC,IAAI,CAAC,QAAQ,EAAE,KAAK,CAAC,CAAC;gBACpC,KAAK,oBAAa,CAAC,GAAG;oBACpB,OAAO,IAAI,CAAC,GAAG,EAAE,CAAC;gBACpB;oBACE,MAAM;aACT;QACH,CAAC,CAAC;QAjCA,IAAA,8BAAS,GAAE,CAAC;QACZ,IAAA,4BAAO,EAAC;YACN,IAAI,EAAE,4CAAuB,CAAC,QAAQ;YACtC,IAAI,EAAE,IAAI,CAAC,GAAG,EAAE;SACjB,CAAC,CAAC;IACL,CAAC;IAED,SAAS;QACP,OAAO,IAAI,CAAC,UAAU,CAAC;IACzB,CAAC;IAED,iBAAiB;QACf,IAAA,uBAAQ,EAAC,4BAAoB,EAAE,IAAI,CAAC,eAAe,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,CAAC;QAChE,UAAU,CAAC,GAAE,EAAE;YACb,aAAa;YACb,OAAO,CAAC,GAAG,CAAC,MAAM,CAAC,UAAU,EAAC,MAAM,CAAC,CAAC;YACtC,aAAa;YACb,MAAM,CAAC,cAAc,EAAE,CAAC;QAC1B,CAAC,EAAC,IAAI,CAAC,CAAC;IACV,CAAC;IAED,oBAAoB,KAAI,CAAC;IAczB,gBAAgB,KAAI,CAAC;IAErB,MAAM;QACJ,MAAM,EACJ,GAAG,EAAE,EAAE,QAAQ,EAAE,GAClB,GAAG,IAAI,CAAC,KAAK,CAAC;QAEf,IAAA,+BAAiB,EAAC,QAAQ,CAAC,CAAC;QAE5B,wEAAwE;QACxE,OAAO,CACL,oBAAC,cAAQ,IAAC,eAAe,EAAE,aAAa;YACtC,oBAAC,mBAAqB,IAAC,QAAQ,EAAE,QAAQ,EAAE,QAAQ,EAAE,IAAI,CAAC,QAAQ,GAAI,CAC7D,CACZ,CAAC;IACJ,CAAC;CACF;AA1DD,oCA0DC',
    },
    _coverageSchema: '1a1c01bbd47fc00a2c39e90264f33305004495a9',
    hash: '40bf31f11fdc17d9adb48c2d011ce4dab42e5cde',
  },
]

let b = ''

function formatCoverage(coverage) {
    return Object.values(coverage).map((item) => {
        return {
            ...item,
            statementMap: Object.values(item.statementMap),
            fnMap: Object.values(item.fnMap),
            branchMap: Object.values(item.branchMap),
            s: Object.values(item.s),
            f: Object.values(item.f),
            b: Object.values(item.b),
        }
    })
}

remapCoverage(a,b).then((res) => {
  console.log(formatCoverage(res))
})
