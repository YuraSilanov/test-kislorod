export default class InputRequired {
	constructor(container) {
		this.container = container;
		this.field = this.container.querySelector('input, textarea');
		this.valid = true;

		this.init();
	}

	init() {
		if (this.field.hasAttribute('required')) {
			this.field.addEventListener('blur', () => this.validate());
			this.field.addEventListener('focus', () =>
				this.container.classList.remove('input--error')
			);
		}
	}

	validate() {
		if (this.field.hasAttribute('required') && !this.field.value.trim()) {
			this.container.classList.add('input--error');
			this.valid = false;
			return false;
		} else {
			this.container.classList.remove('input--error');
			this.valid = true;
			return true;
		}
	}
}

document.querySelectorAll('.js-input--required').forEach((el) => {
	const instance = new InputRequired(el);
	el._instance = instance;
});
