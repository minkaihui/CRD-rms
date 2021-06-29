/**
 * 工具类
 */

export default {
  /**
   *   处理element在IPad选择日期，时间时，弹出键盘问题
   */
  forbid(that: any) {
    that.$nextTick(() => {
      const inputTime = (document as any).querySelectorAll('.el-input__inner');
      if (inputTime.length > 0) {
        inputTime.forEach((item: any) => {
          if (
            item.parentNode.className.indexOf('el-date-editor') > -1 ||
            item.className.indexOf('el-date-editor') > -1
          ) {
            (document as any).activeElement.blur();
          }
        });
      }
    });
  },
  /**
   *判断对象是否为空
   *
   * @param {*} obj 传入的对象
   */
  isObjEmpty(obj: any) {
    if (!obj || JSON.stringify(obj) == '{}') {
      return true;
    } else {
      return false;
    }
  },
  /**
   *获取浮点数的小数位数
   *
   * @param {*} obj 传入的浮点数
   *returns  返回小数位数
   */
  getDecimalPrecision(obj: number) {
    const arr = obj.toString().split('.');
    if (arr.length == 2) {
      return arr[1].length;
    } else {
      return 0;
    }
  },
  /**
   *合法uri
   *
   * @param {string} textval
   * @returns
   */
  validateURL(textval: string) {
    const urlregex: any =
      /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/;
    return urlregex.test(textval);
  },

  /**
   *小写字母校验
   *
   * @param {string} str
   * @returns
   */
  validateLowerCase(str: string) {
    const reg = /1+$/;
    return reg.test(str);
  },

  /**
   *大写字母校验
   *
   * @param {string} str
   * @returns
   */
  validateUpperCase(str: string) {
    const reg = /2+$/;
    return reg.test(str);
  },

  /**
   *大小写字母校验
   *
   * @param {string} str
   * @returns
   */
  validateAlphabets(str: string) {
    const reg = /3+$/;
    return reg.test(str);
  },

  /**
   *市场售价
   *
   * @param {string} str
   * @returns
   */
  validatePrice(str: string) {
    const reg: any =
      /(4\d(.\d{1,2})?KaTeX parse error: Can't use function '\.' in math mode at position 7: )|(^0(\̲.̲\d{1,2})?)/;
    return reg.test(str);
  },

  /**
   *库存预警值 匹配非负整数（正整数 + 0）
   *
   * @param {string} str
   * @returns
   */
  validatestockWarn(str: string) {
    const reg = /^(0|[1-9][0-9])$/;
    return reg.test(str);
  },

  /**
   *固定电话校验
   *
   * @param {string} str
   * @returns
   */
  validateTelephone(str: string) {
    const reg = /^((\d{3,4})|\d{3,4}-|\s)?\d{7,14}$/;
    return reg.test(str);
  },

  /**
   *手机号码校验
   *
   * @param {string} str
   * @returns
   */
  validatePhoneNumber(str: string) {
    const reg = /1[3,4,5,6,7,8,9][0-9]{9}$/;
    return reg.test(str);
  },
  /**
   * 手机号码和固定电话
   *
   * @param {string} str
   * @returns
   */
  validatePhTelNumber(str: string) {
    const reg = /^(((\d{3,4})|\d{3,4}-|\s)?\d{7,14})|([1][3,4,5,6,7,8,9][0-9]{9})$/;
    return reg.test(str);
  },

  /**
   *电子邮箱校验
   *
   * @param {string} str
   * @returns
   */
  validateEmail(str: string) {
    const reg = /6+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/;
    return reg.test(str);
  },

  /**
   *邮编校验
   *
   * @param {string} str
   * @returns
   */
  validateZipCode(str: string) {
    const reg = /7[0-9]{5}$/;
    return reg.test(str);
  },

  /**
   *身份证校验
   *
   * @param {string} str
   * @returns
   */
  validateIDCard(str: string) {
    const reg = /(\d{15}$)|(^\d{18}$)|(\d{17}(\d|X|x)$)/;
    return reg.test(str);
  },

  /**
   *银行卡号 15位或者16位或者19位
   *
   * @param {string} str
   * @returns
   */
  validateBank(str: string) {
    const reg = /^([1-9]{1})(\d{14}|\d{18}|\d{15})$/;
    return reg.test(str);
  },
  /**
   *根据数组对象主键id和值获取索引
   *
   * @param {*} array     数组
   * @param {string} id   主键ID名称
   * @param {*} value     主键ID值
   * @returns      匹配的索引(未匹配到是-1  匹配到时从0开始的值)
   */
  getObjectArrayIndex(array: any, id: string, value: any) {
    let index = -1;
    if (!!array && array.length > 0 && array[0].hasOwnProperty(id)) {
      for (let i = 0; i < array.length; i++) {
        if (array[i][id] == value) {
          index = i;
          break;
        }
      }
    }
    return index;
  },
  /**
   * 获取对象第N个属性的名称
   * @param obj 需要查找的对象
   * @param n   需要找第几个属性（从1开始）
   */
  getObjectNAttributeName(obj: any, n: number) {
    let result: any = undefined;
    const i = 1;
    for (const key in obj) {
      if (i == n) {
        result = key;
      }
    }
    return result;
  },

  /**
   * 获取对象第N个属性的值
   * @param obj 需要查找的对象
   * @param n   需要找第几个属性（从1开始）
   */
  getObjectNAttributeValue(obj: any, n: number) {
    let result: any = undefined;
    const i = 1;
    for (const key in obj) {
      if (i == n) {
        result = obj[key];
      }
    }
    return result;
  },
  /**
   *根据数组对象组合组件查找索引
   *
   * @param {*} array  数组
   * @param {*} ids    组合键名称(多个以逗号分隔)
   * @param {*} values
   * @returns
   */
  getObjectArrayIndex_V2(array: any, ids: any, values: any) {
    let index = -1;
    if (!ids || !values) {
      return index;
    }
    const arrId = ids.split(',');
    const arrValue = values.split(',');
    if (arrId.length != arrValue.length) {
      return index;
    }
    if (!!array && array.length > 0) {
      for (let i = 0; i < array.length; i++) {
        let equelCnt = 0;
        for (let j = 0; j < arrId.length; j++) {
          if (array[i][arrId[j]] == arrValue[j]) {
            equelCnt++;
          }
        }
        if (equelCnt == arrId.length) {
          index = i;
          break;
        }
      }
    }
    return index;
  },

  /**
   *根据数组值获取索引
   *
   * @param {*} array 数值型数组(项目是值或则字符串)
   * @param {*} value 需要查找的值
   * @returns
   */
  getArrayIndex(array: any, value: any) {
    let index = -1;
    if (!!array && array.length > 0) {
      for (let i = 0; i < array.length; i++) {
        if (array[i] == value) {
          index = i;
          break;
        }
      }
    }
    return index;
  },

  /* 根据对象数组的项目指定属性获取对象数组的差值*/
  /* @param a1  减数组*/
  /* @param a2  被减数组*/
  /* @param id   用来判断的数组对象属性*/
  getObjectArrayDiff(a1: any, a2: any, id: string) {
    const that = this;
    if (!a1 || !a2 || a1.length == 0) {
      return [];
    }
    if (a2.length == 0) {
      return a1;
    }
    if (!id || id.length == 0) {
      return [];
    }
    if (!(id in a1[0]) || !(id in a2[0])) {
      return [];
    }
    return this.grep(a1, function (item: any, index: number) {
      return that.getObjectArrayIndex(a2, id, item[id]) < 0;
    });
  },

  /*根据对象数组的项目指定属性获取对象数组的交集*/
  /* @param a1  对象数组1*/
  /* @param a2  对象数组2*/
  /* @param id   用来判断的数组对象属性*/
  getObjectArrayCross(a1: any, a2: any, id: string) {
    const that = this;
    if (!a1 || !a2 || a1.length == 0) {
      return [];
    }
    if (a2.length == 0) {
      return a1;
    }
    if (!id || id.length == 0) {
      return [];
    }
    if (!(id in a1[0]) || !(id in a2[0])) {
      return [];
    }
    return this.grep(a1, function (item: any, index: number) {
      return that.getObjectArrayIndex(a2, id, item[id]) >= 0;
    });
  },
  //获取数组中满足条件的数据
  /*数组或则列表 */
  /*回调函数 function(element,index){} */
  /* 回调函数不等于的值，可不传*/
  grep(elems: any, callback: any, inv = false) {
    let retVal,
      ret = [];
    inv = !!inv;
    for (let i = 0, length = elems.length; i < length; i++) {
      retVal = !!callback(elems[i], i);
      if (inv !== retVal) {
        ret.push(elems[i]);
      }
    }
    return ret;
  },

  //遍历对象、列表或则数组
  /* obj:被遍历的对象*/
  /* callback:function(index,element){}*/
  /* args:遍历参数*/
  each(obj: any, callback: any, args: any = undefined) {
    let name,
      i = 0,
      length = obj.length,
      isObj = length === undefined || typeof obj == 'function';

    if (args) {
      if (isObj) {
        for (name in obj) {
          if (callback.apply(obj[name], args) === false) {
            break;
          }
        }
      } else {
        for (; i < length; ) {
          if (callback.apply(obj[i++], args) === false) {
            break;
          }
        }
      }
    } else {
      if (isObj) {
        for (name in obj) {
          if (callback.call(obj[name], name, obj[name]) === false) {
            break;
          }
        }
      } else {
        for (; i < length; ) {
          if (callback.call(obj[i], i, obj[i++]) === false) {
            break;
          }
        }
      }
    }

    return obj;
  },

  /*去掉前后空格 */
  trim:
    String.prototype.trim && !String.prototype.trim.call('\uFEFF\xA0')
      ? function (text: any) {
          return text == null ? '' : String.prototype.trim.call(text);
        }
      : function (text: any) {
          return text == null ? '' : (text + '').replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        },

  /**
   *对象克隆
   *
   * @param {*} sObj
   * @returns
   */
  clone(sObj: any) {
    if (sObj == null || typeof sObj !== 'object') {
      return sObj;
    }
    let s: any = {};
    if (sObj.constructor == Array) {
      s = [];
    }
    for (const i in sObj) {
      s[i] = this.clone(sObj[i]);
    }
    return s;
  },

  //生成guid
  getGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },

  /*格式化相关的方法 */
  format: (function () {
    return {
      /**
       *格式化数值
       *
       * @param {*} n
       * @returns
       */
      formatNumber(n: any) {
        n = n.toString();
        return n[1] ? n : '0' + n;
      },

      /**
       *质朴长存法  数字前面补0
       *
       * @param {*} num
       * @param {number} n
       * @returns
       */
      pad(num: any, n: number) {
        let len = num.toString().length;
        while (len < n) {
          num = '0' + num;
          len++;
        }
        return num;
      },
      /**
       *是否数字
       *
       * @param {*} value
       * @returns
       */
      isNumber(value: any) {
        if (!isNaN(value)) {
          return true;
        }
        return false;
      },
      /**
       *转为数值
       *
       * @param {string} value
       * @returns
       */
      toNumber(value: string) {
        if (value) {
          return parseFloat(value);
        }
        return 0;
      },
      /**
       **转为指定小数位数的浮点数
       *
       * @param {string} value
       * @param {number} precision
       * @returns
       */
      toDecimal(value: string, precision: number) {
        let d = 0;
        if (value) {
          d = parseFloat(value);
        }
        return parseFloat(d.toFixed(precision));
      },

      /**
       *格式化时间
       *
       * @param {Date} datetime  时间
       * @returns                yyyy-MM-dd hh:mm:ss
       */
      formatTime(datetime: Date) {
        const year = datetime.getFullYear();
        const month = datetime.getMonth() + 1;
        const day = datetime.getDate();
        const hour = datetime.getHours();
        const minute = datetime.getMinutes();
        const second = datetime.getSeconds();

        return (
          [year, month, day].map(this.formatNumber).join('-') +
          ' ' +
          [hour, minute, second].map(this.formatNumber).join(':')
        );
      },
      /**
       *根据指定的格式格式化时间
       *
       * @param {Date} time   时间
       * @param {string} fmt  格式化字符串
       * @returns
       */
      formatTime2(time: Date, fmt: string) {
        const o: any = {
          'M+': time.getMonth() + 1, //月份
          'd+': time.getDate(), //日
          'h+': time.getHours(), //小时
          'm+': time.getMinutes(), //分
          's+': time.getSeconds(), //秒
          'q+': Math.floor((time.getMonth() + 3) / 3), //季度
          S: time.getMilliseconds(), //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (const k in o)
          if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
            );
        return fmt;
      },

      /**
       *格式化日期
       *
       * @param {Date} date 时间
       * @returns  格式化后的日期 yyyy-MM-dd
       */
      formatDate(date: Date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();

        return [year, month, day].map(this.formatNumber).join('-');
      },

      /**
       *格式化日期
       *
       * @param {Date} date 日期
       * @returns 格式化后的日期   yyyy/MM/dd
       */
      formatDate2(date: Date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();

        return [year, month, day].map(this.formatNumber).join('/');
      },
      /**
       *获取string格式日期的星期
       *
       * @param {string} data  时间
       * @returns   周日,周一,周二,...,周六
       */
      formatDateToWeek(data: string) {
        const date = new Date(Date.parse(data));
        const month = date.getDay();
        let weekDay;
        switch (month) {
          case 0:
            weekDay = '周日';
            break;
          case 1:
            weekDay = '周一';
            break;
          case 2:
            weekDay = '周二';
            break;
          case 3:
            weekDay = '周三';
            break;
          case 4:
            weekDay = '周四';
            break;
          case 5:
            weekDay = '周五';
            break;
          case 6:
            weekDay = '周六';
            break;
        }
        return weekDay;
      },

      /**
       *日期的加上指定天数
       *
       * @param {string} date 日期
       * @param {number} days 加上的天数（负数表示减）
       * @returns
       */
      addDay(date: string, days: number) {
        //下面的不是时间戳，是时间戳*1000
        const timestamp = Date.parse(date);
        const newTimestamp = timestamp + days * 24 * 60 * 60 * 1000;
        const dateLast = new Date(newTimestamp);

        const year = dateLast.getFullYear();
        const month = dateLast.getMonth() + 1;
        const day = dateLast.getDate();

        return [year, month, day].map(this.formatNumber).join('-');
      },

      /**
       *日期加上指定月份
       *
       * @param {Date} date 日期
       * @param {number} months 月数 （负数表示减去指定月份）
       * @returns
       */
      addMonth(date: Date, months: number) {
        if (typeof months == 'string') {
          months = parseInt(months);
        }
        const curYear = date.getFullYear();
        const curMonth = date.getMonth() + 1;
        const curDay = date.getDate();
        let month = (curMonth + months - 1) % 12;
        let year = curYear + (curMonth + months - month) / 12;
        const days = curDay;
        date = new Date(year, month, days);
        year = date.getFullYear();
        month = date.getMonth() + 1;
        const day = date.getDate();

        return [year, month, day].map(this.formatNumber).join('-');
      },
      //获得指定某一天日期（DAY：0代表今天）
      getDay(day: any) {
        const that: any = this;
        const today = new Date();
        const targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
        today.setTime(targetday_milliseconds); //注意，这行是关键代码

        const tYear = today.getFullYear();
        let tMonth = today.getMonth();
        let tDate = today.getDate();
        tMonth = that.doHandleMonth(tMonth + 1);
        tDate = that.doHandleMonth(tDate);
        return tYear + '-' + tMonth + '-' + tDate;
      },
      // 1-9 前面加0
      doHandleMonth(month: any) {
        let m = month;
        if (month.toString().length == 1) {
          m = '0' + month;
        }
        return m;
      },
      // 获取近几年年份
      getDateTime(dateTime: any) {
        const that: any = this;
        const myDate = new Date();
        let thisYear = myDate.getFullYear(); // 获取当年年份
        const Section = thisYear - 2013; // 声明一个变量 获得当前年份至想获取年份差 eg.2008
        for (let i = 0; i <= Section; i++) {
          dateTime.push(thisYear--);
        }
      },
      getDaysBetween(date1: any, date2: any) {
        const days = (date2 - date1) / (1 * 24 * 60 * 60 * 1000);
        return days;
      },
    };
  })(),
};
