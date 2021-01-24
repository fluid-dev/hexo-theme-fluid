/**
 * @description: 
 * @author: bubao
 * @date: 2021-01-24 18:42:32
 * @last author: bubao
 * @last edit time: 2021-01-24 18:42:33
 */
Object.assign(HTMLElement.prototype, {
	createChild: function (tag, obj, positon) {
		var child = document.createElement(tag);
		Object.assign(child, obj)
		switch (positon) {
			case 'after':
				this.insertAfter(child)
				break;
			case 'replace':
				this.innerHTML = ""
			default:
				this.appendChild(child)
		}
		return child
	},
	wrap: function (obj) {
		var box = document.createElement('div');
		Object.assign(box, obj)
		this.parentNode.insertBefore(box, this);
		this.parentNode.removeChild(this);
		box.appendChild(this);
	},
	height: function (h) {
		if (h) {
			this.style.height = typeof h == 'number' ? h + 'rem' : h;
		}
		return this.getBoundingClientRect().height
	},
	width: function (w) {
		if (w) {
			this.style.width = typeof w == 'number' ? w + 'rem' : w;
		}
		return this.getBoundingClientRect().width
	},
	top: function () {
		return this.getBoundingClientRect().top
	},
	left: function () {
		return this.getBoundingClientRect().left
	},
	attr: function (type, value) {
		if (value === null) {
			return this.removeAttribute(type)
		}

		if (value) {
			this.setAttribute(type, value)
			return this
		} else {
			return this.getAttribute(type)
		}
	},
	insertAfter: function (element) {
		var parent = this.parentNode;
		if (parent.lastChild == this) {
			parent.appendChild(element);
		} else {
			parent.insertBefore(element, this.nextSibling);
		}
	},
	display: function (d) {
		if (d == null) {
			return this.style.display
		} else {
			this.style.display = d;
			return this
		}
	},
	child: function (selector) {
		return $(selector, this)
	},
	find: function (selector) {
		return $.all(selector, this)
	},
	_class: function (type, className, display) {
		var classNames = className.indexOf(' ') ? className.split(' ') : [className];
		var that = this;
		classNames.forEach(function (name) {
			if (type == 'toggle') {
				that.classList.toggle(name, display)
			} else {
				that.classList[type](name)
			}
		})
	},
	addClass: function (className) {
		this._class('add', className);
		return this;
	},
	removeClass: function (className) {
		this._class('remove', className);
		return this;
	},
	toggleClass: function (className, display) {
		this._class('toggle', className, display);
		return this;
	},
	hasClass: function (className) {
		return this.classList.contains(className)
	}
});