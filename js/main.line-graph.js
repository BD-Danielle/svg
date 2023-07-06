class LineGraph {
  constructor(scores, options = {}) {
    const {
      baseline, levels, pointSize, svgSelector, lineSelector, circleContainerSelector, circleFillColor
    } = options;

    this.scores = scores;
    this.cx = [];
    this.cy = [];
    this.cySpacing = 10;
    this.baseline = baseline;
    this.levels = levels;
    this.pointSize = pointSize;
    this.polyline = document.querySelector(lineSelector);
    this.svgElement = document.querySelector(svgSelector);
    this.circleContainer = document.querySelector(circleContainerSelector);
    this.circleFillColor = circleFillColor;

    this.getAttribute = function () {
      const svgHeight = this.svgElement.getBoundingClientRect().height || 200;
      const svgWidth = this.svgElement.getBoundingClientRect().width;

      this.cx = this.scores.map((_, i, a) => (i + 1) * svgWidth / a.length - svgWidth / a.length / 2);
      this.cy = this.scores.map((c) => (Math.abs((c % this.baseline) / this.cySpacing - this.levels)) * svgHeight / this.levels - svgHeight / this.levels / 2);

      let points = this.cx.reduce((acc, cur, i) => {
        if (i === 0) {
          return acc + `${cur},${this.cy[i]} ${this.cx[i + 1]}`;
        } else if (i === this.scores.length - 1) {
          return acc + `,${this.cy[i]}`;
        } else {
          return acc + `,${this.cy[i]} ${this.cx[i + 1]}`;
        }
      }, "");

      this.polyline.setAttribute("points", points);
    };

    this.makeSVG = function (tag, attrs) {
      const el = document.createElementNS('http://www.w3.org/2000/svg', tag);

      for (let [key, value] of Object.entries(attrs)) {
        el.setAttribute(key, value);
      }

      return el;
    };

    this.svgRendering = function () {
      this.scores.forEach((_, i) => {
        const circle = this.makeSVG('circle', { cx: this.cx[i], cy: this.cy[i], r: this.pointSize, stroke: 'none', fill: this.circleFillColor });
        this.circleContainer.appendChild(circle);
      });
    };

    this.removeAllCircles = function () {
      const circles = document.querySelectorAll(`${circleContainerSelector} circle`);
      circles.forEach((circle) => {
        this.circleContainer.removeChild(circle);
      });
    };

    this.handleResize = function () {
      this.removeAllCircles();
      this.getAttribute();
      this.svgRendering();
    };

    this.init = function () {
      this.getAttribute();
      this.svgRendering();
      window.addEventListener("resize", this.handleResize.bind(this));
    };
  }
}

window.LineGraph = LineGraph;