/* =========================================================
   Hiệu ứng cho trang portfolio.
   Thiếu file này (hoặc trình duyệt tắt JavaScript) thì trang
   vẫn hiển thị đầy đủ, chỉ không có hiệu ứng khi cuộn.
   ========================================================= */
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Thanh trên cùng đổ bóng khi bắt đầu cuộn */
  var topbar = document.querySelector('.topbar');
  if (topbar) {
    var onScroll = function () {
      topbar.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Máy bật "giảm chuyển động": dừng ở đây, không chạy hiệu ứng nào nữa */
  if (reduceMotion) return;

  document.documentElement.classList.add('motion-ok');

  /* Hiện dần khi cuộn tới.
     [data-stagger]: các mục con hiện lần lượt, cách nhau một chút.
     [data-reveal]: phần tử tự hiện khi cuộn tới. */
  document.querySelectorAll('[data-stagger]').forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, index) {
      child.setAttribute('data-reveal', '');
      child.style.setProperty('--i', index);
    });
  });

  var revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    revealItems.forEach(function (el) { observer.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* Con số doanh thu chạy từ 0 lên giá trị trong data-count */
  var counter = document.querySelector('[data-count]');
  if (counter) {
    var target = parseInt(counter.getAttribute('data-count'), 10);
    var suffix = counter.getAttribute('data-suffix') || '';
    var format = function (n) {
      return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + suffix; // 8000 -> 8.000
    };

    counter.textContent = format(0);

    var runCounter = function () {
      // giữ chiều rộng của số cuối cùng để chữ "USD/tháng" không xê dịch
      counter.textContent = format(target);
      counter.style.minWidth = counter.getBoundingClientRect().width + 'px';
      counter.textContent = format(0);

      var start = null;
      var delay = 500;
      var duration = 1400;
      var step = function (now) {
        if (start === null) start = now;
        var progress = Math.min(1, Math.max(0, (now - start - delay) / duration));
        var eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = format(Math.round(target * eased));
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          counter.style.minWidth = '';
        }
      };
      requestAnimationFrame(step);
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(runCounter);
    } else {
      runCounter();
    }
  }

  /* Rê chuột lên ảnh: phóng to đúng chỗ con trỏ đang chỉ */
  var gallery = document.querySelector('.gallery');
  if (gallery && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    gallery.addEventListener('pointermove', function (e) {
      var box = gallery.getBoundingClientRect();
      gallery.style.setProperty('--zx', ((e.clientX - box.left) / box.width * 100).toFixed(1) + '%');
      gallery.style.setProperty('--zy', ((e.clientY - box.top) / box.height * 100).toFixed(1) + '%');
    });
  }
})();
