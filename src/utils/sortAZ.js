// 格式
// a= [
//   {
//     name:''
//   }
// ]
// AZarr(a,name)
export function AZarr(arr,name) {
  if(!name) console.log('请绑定需要排序的字段名称')
  if (arr.length == 0) return arr;

  if (!String.prototype.localeCompare) return null;

  let letters = '*ABCDEFGHJKLMNOPQRSTWXYZ'.split('');

  let zh = '阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀'.split('');

  let segs = []; // 存放数据

  let res = {};

  let curr;

  let re = /[^\u4e00-\u9fa5]/; //中文正则

  let pattern = new RegExp(
    "[`\\-~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*()——|{}【】‘；：”“'。，、？12345678990]"
  ); //特殊符号

  letters.filter((items, i) => {
    curr = {
      initial: '', //字母

      data: [], //数据
    };

    arr.map((v, index) => {
      // 特殊字符

      if (pattern.test(v[name][0])) {
        if (
          (!zh[i - 1] || zh[i - 1].localeCompare(v[name]) <= 0) &&
          v[name].localeCompare(zh[i]) == -1
        ) {
          curr.data.push(v);
        }
      }

      // 判断首个字是否是中文

      if (re.test(v[name][0])) {
        // 英文

        if (v[name][0].toUpperCase() == items) {
          curr.data.push(v);
        }
      } else {
        // 中文

        if (
          (!zh[i - 1] || zh[i - 1].localeCompare(v[name]) <= 0) &&
          v[name].localeCompare(zh[i]) == -1
        ) {
          curr.data.push(v);
        }
      }
    });

    if (curr.data.length) {
      curr.initial = letters[i];

      segs.push(curr);

      curr.data.sort((a, b) => {
        return a[name].localeCompare(b[name]);
      });
    }
  });

  res.segs = Array.from(new Set(segs)); //去重
  return res.segs;
}
