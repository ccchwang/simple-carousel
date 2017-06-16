var Carousel = function(el) {
  this.$el = $(el);
  this.init();
};

Carousel.prototype = {
  init: function() {
    this.setVariables();
    this.bindEvents();

    window.addEventListener('resize', function(){
      this.maxItems = Math.floor(this.$viewport.width() / this.itemWidth);
    }.bind(this))
  },

  setVariables: function() {
    this.$btnPrev = this.$el.find('.carousel-nav-previous');
    this.$btnNext = this.$el.find('.carousel-nav-next');
    this.$content = this.$el.find('.carousel-content');
    this.$items = this.$el.find('.carousel-item');
    this.$viewport = this.$el.find('.carousel-viewport');

    this.itemWidth = this.$items.eq(0).width();
    this.length = this.$items.length;
    this.carouselItems = Array.prototype.slice.call(this.$items);
    this.position = 1;
    this.viewportWidth = this.$viewport.width();
    this.maxItems = Math.floor(this.viewportWidth / this.itemWidth);
  },

  bindEvents: function() {
    this.$btnPrev.on('click', this.previous.bind(this));
    this.$btnNext.on('click', this.next.bind(this));
  },

  getAvailableItems: function(direction) {
    var currentPosition = this.position;
    var maxPosition = this.length - this.maxItems + 1;

    var availableItems = this.maxItems;
    var newPosition = currentPosition + this.maxItems * direction;

    if (direction === 1) {
      if (currentPosition >= maxPosition) {
        availableItems = 0;
      }
      //if new position matches the # of items available (matches the last item), means there's just 1 item left. So increment carousel by 1
      else if (newPosition === this.length) {
        availableItems = 1;
      }
      //if new position exceeds max position possible, subtract max # from # of all items to show last remaining items
      else if (newPosition >= maxPosition) {
        availableItems = this.length - maxPosition + 1;
      }
    } else {
      maxPosition = 1;
      if (currentPosition <= maxPosition) {
        availableItems = 0;
      } else if (newPosition <= maxPosition) {
        availableItems = Math.abs(maxPosition - currentPosition);
      }
    }


    return availableItems;
  },

  previous: function() {
    this.rotate(-1);
  },

  next: function() {
    this.rotate(1);
  },

  rotate: function(direction) {
    var availableItems = this.getAvailableItems(direction);

    if (!availableItems) {
      return;
    }

    //page width is width of # of items left
    var pageWidth = (this.itemWidth + 20) * availableItems;

    //how left are the items right now?
    var left = parseInt($(this.carouselItems[0]).css('left'), 10) || 0;

    //calculate new left based on the left we are at now (line 87)
    var newLeft = left - pageWidth * direction;


    let delay = 0,
        visibleItems,
        hiddenItems,
        //for reverse - new position is current position we're on PLUS the # of visible items in front of it
        newPosition = this.position + this.maxItems;


    //set which slices of the items array are visible or hidden
    if (direction < 0) {
      visibleItems = this.carouselItems.slice(0, newPosition).reverse();
      hiddenItems = this.carouselItems.slice(newPosition).reverse()
    }
    else {
      visibleItems = this.carouselItems.slice(this.position - 1);
      hiddenItems = this.carouselItems.slice(0, this.position - 1);
    }

    //apply transition to each course item, based on whether it's hidden or visible
    hiddenItems.forEach(item => {
      var itemStyles = {left: newLeft};

      $(item).css(itemStyles);
    })

    visibleItems.forEach(item => {
      var itemStyles = {left: newLeft, 'transition-delay': `${delay}ms`};

      $(item).css(itemStyles);
      delay += 100;
    })



    this.position += availableItems * direction;
  }
};
