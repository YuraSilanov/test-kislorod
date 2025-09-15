export default class InputRequired {
	constructor(container) {
		this.container = container;
		this.field = this.container.querySelector('input, textarea');
		this.valid = true;

		this.minLength = 3;
		this.maxLength = 40;

		this.allowedPattern = /^[A-Za-zА-Яа-яЁё0-9\s]+$/;

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
		const value = this.field.value.trim();

		if (this.field.hasAttribute('required') && !value) {
			this.setError();
			return false;
		}

		if (value.length < this.minLength || value.length > this.maxLength) {
			this.setError();
			return false;
		}

		if (!this.allowedPattern.test(value)) {
			this.setError();
			return false;
		}

		this.clearError();
		return true;
	}

	setError() {
		this.container.classList.add('input--error');
		this.valid = false;
	}

	clearError() {
		this.container.classList.remove('input--error');
		this.valid = true;
	}
}

document.querySelectorAll('.js-input--required').forEach((el) => {
	const instance = new InputRequired(el);
	el._instance = instance;
});
