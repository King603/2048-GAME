export default {
  data() {
    return {
      show: 0,
      msg: "",
      pass: !1,
      start: {}, //记录移动端触摸起始点
      nums: [] //记录16个框格的数字
    };
  },
  ready() {
    document.addEventListener("keyup", this.keyDown);
    let ul = document.querySelector("#app ul");
    ul.addEventListener("touchstart", this.touchStart);
    ul.addEventListener("touchend", this.touchEnd);
    // document上获取touchmove事件 如果是由.box触发的 则禁止屏幕滚动
    document.addEventListener(
      "touchmove",
      e => e.target.classList.contains("box") && e.preventDefault()
    );
    localStorage.ave1
      ? this.nums = JSON.parse(localStorage.save1)
      : this.reset();
  },
  directives: {
    getclass(value) {
      let classes = this.el.classList;
      [].forEach.call(classes, _ => /^s\w+$/.test(_) && classes.remove(_));
      classes.remove("empty");
      classes.add(value ? "s" + value : "empty");
    },
    getposition(index, percent) {
      let pos = this.vm.getIndexPos(index, !0);
      // this.el.style.left = pos.left;
      // this.el.style.top = pos.top;
      ({ left: this.el.style.left, top: this.el.style.top } = pos);
    }
  },
  methods: {
    // 获取指定索引位置的css:top，left百分比值
    getIndexPos(index, percent) {
      let p = percent ? "%" : "";
      return {
        left: (index % 4) * 25 + p,
        top: Math.floor(index / 4) * 25 + p
      };
    },
    // 在一个随机的空白位添加2或4 概率9:1
    randomAdd() {
      //延时100毫秒添加
      setTimeout(() => {
        this.nums.$set(
          this.shuffle(this.blankIndex()).pop(),
          Math.random() > .9 ? 4 : 2
        );
      }, 100);
    },
    // 添加一个新的方块，并指定索引和里面的内容
    newBoxApear(index, num, combin) {
      let box = document.createElement("div"),
        pos = this.getIndexPos(index, !0);
      box.className = `${num ? "s" + num : "empty"} box${
        combin ? " combin" : ""
        }`;
      box.style.left = pos.left;
      box.style.top = pos.top;
      box.innerText = num || "";
      document.getElementById("wrap").appendChild(box);
      return box;
    },
    // 获取当前空白隔索引组成的数组
    blankIndex() {
      let arr = [];
      this.nums.forEach((i, j) => i === "" && arr.push(j));
      return arr;
    },
    // 打乱数组
    shuffle(arr) {
      let l = arr.length;
      while (l--) {
        let j = parseInt(Math.random() * l);
        [arr[l], arr[j]] = [arr[j], arr[l]];
      }
      return arr;
    },
    // 把数组arr当成矩阵，转置n次
    // [1,2,3,4] 1次转置变为 [3,1,4,2]
    T(arr, n) {
      n %= 4;
      if (n === 0) return arr;
      let d = Math.sqrt(arr.length),
        tmp = [];
      for (let i = 0; i < d; i++)
        for (let j = 0; j < d; j++) tmp[d - i - 1 + j * d] = arr[i * d + j];
      if (n > 1) tmp = this.T(tmp, n - 1);
      return tmp;
    },
    touchStart(e = window.event) {
      this.start.x = e.changedTouches[0].pageX;
      this.start.y = e.changedTouches[0].pageY;
    },
    touchEnd(e = window.event) {
      let curPoint = e.changedTouches[0],
        x = curPoint.pageX - this.start.x,
        y = curPoint.pageY - this.start.y,
        xx = Math.abs(x),
        yy = Math.abs(y),
        i = 0;
      // 移动范围太小 不处理
      if (xx < 50 && yy < 50) return;
      i =
        xx >= yy
          ? x < 0
            ? 0
            : 2 // 横向滑动
          : y < 0
            ? 3
            : 1; // 纵向滑动
      this.handle(i);
    },
    /**
     * 方向键 事件处理
     * 把上、右、下方向通过旋转 变成左向操作
     */
    keyDown(e) {
      // 左上右下 分别转置0 3 2 1 次
      const map = {
        37: 0, // LEFT
        38: 3, // UP
        39: 2, // RIGHT
        40: 1, // DOWN
        65: 0, // A
        87: 3, // W
        68: 2, // D
        83: 1 // S
      };
      if (e.keyCode in map) this.handle(map[e.keyCode]);
      else return;
    },
    handle(i) {
      this.move(i);
      this.save();
      this.isPass(); // 判断是否过关
    },
    /**
     * 移动滑块
     * @param {Number} i 转置次数
     */
    move(i) {
      let indexs = this.T(Object.keys(String(Array(17))), i), // 记录旋转前的各个位置索引
        tmp = this.T(this.nums, i), // 把任意方向键转置，当成向左移动
        hasMove = !1, // 一次操作有移动方块时才添加方块
        /**
         * 记录已经合并过一次的位置 避免重复合并
         * 如 2 2 4 4 在一次合并后应为 4 8 0 0  而非8 4 0 0
         */
        hasCombin = {};
      tmp.forEach((j, k) => {
        let newIndex = 0, // 方块挪动后的索引 （转换后的索引）
          index = indexs[k] - 0, // 换算到转换前的索引
          thisMoved = !1, // 此方块有数字，且被移动了 标记  需要应用动画
          combinNum = 0; // 方块若有合并，记录合并后的数字
        while (k % 4 && j !== "") {
          if (tmp[k - 1] === "") {
            // 当前位置的前一位置为空,交换俩位置
            tmp[k - 1] = j;
            tmp[k] = "";
            hasMove = !0;
            thisMoved = !0;
            if (hasCombin[k]) {
              // 该位置有过合并，挪动后要记录到挪动后的位置
              hasCombin[k - 1] = !0;
              hasCombin[k] = !1;
            }
            newIndex = k - 1;
          } else if (tmp[k - 1] === j && !hasCombin[k] && !hasCombin[k - 1]) {
            // 当前位置与前一位置数字相同，合并到前一位置，然后清空当前位置
            j *= 2;
            tmp[k - 1] = j;
            tmp[k] = "";
            hasMove = !0;
            thisMoved = !0;
            combinNum = j;
            hasCombin[k - 1] = !0; // 记录合并位置
            newIndex = k - 1;
          } else break;
          k--;
        }
        thisMoved && this.moveNode(index, indexs[newIndex], combinNum);
      });
      setTimeout(() => {
        this.nums = this.T(tmp, 4 - i); // 转置回去，把数据还给this.nums
        hasMove && this.randomAdd();
      }, 101);
    },
    // 索引index的元素移动到nextIndex
    moveNode(index, nextIndex, combinNum) {
      let allBox = document.querySelectorAll(".box"),
        curEle = allBox[index], // 将被移动的元素
        clone = curEle.cloneNode(!0), // 当前元素克隆 包括里面的数组 用作移动动画
        pEle = curEle.parentNode,
        curPos = this.getIndexPos(index, !0),
        box = allBox[allBox.length - 1].cloneNode(); // 复制最后一个元素做当前元素的遮罩
      box.className = "box empty";
      box.style.left = curPos.left;
      box.style.top = curPos.top;
      pEle.insertAdjacentElement("beforeEnd", box);
      curEle.style.opacity = 0;
      let nextEle = null;
      combinNum && (nextEle = this.newBoxApear(nextIndex, combinNum, !0));
      let nextPos = this.getIndexPos(nextIndex);
      clone.classList.add(
        clone.style.left === nextPos.left + "%"
          ? "y" + nextPos.top
          : "x" + nextPos.left
      );
      pEle.insertAdjacentElement("beforeEnd", clone);
      // 移动动画结束
      clone.addEventListener("animationend", () => {
        clone.remove();
        nextEle && nextEle.remove();
        box.remove();
        curEle.style.opacity = 1;
      });
    },
    save() {
      localStorage.save1 = JSON.stringify(this.nums);
    },
    // 重置游戏
    reset() {
      // [].fill兼容性还是太低
      // this.nums = Array(16).fill('');
      this.nums = Array(16)
        .join("-")
        .split("-");
      let i = 0;
      while (i++ < 2)
        // 随机添加2个
        this.randomAdd();
      this.show = 0;
    },
    isPass() {
      let isOver = !0,
        hasBlank = !1,
        tmp = this.T(this.nums, 1);
      this.nums.forEach((i, j) => {
        if (
          !i ||
          this.nums[j - 4] == i ||
          this.nums[j + 4] == i ||
          tmp[j - 4] == tmp[j] ||
          tmp[j + 4] == tmp[j]
        )
          isOver = !1;
        if (i == 2048 && !this.pass) {
          this.msg = "2048";
          this.show = 1;
          // 确保只提示一次 达到2048仍可以继续玩
          this.pass = !0;
        }
      });
      if (isOver) {
        this.msg = "Game Over";
        this.show = 1;
      }
    }
  }
}