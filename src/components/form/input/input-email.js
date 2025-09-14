export default class InputEmail {
	constructor(container) {
		this.container = container;
		this.field = container.querySelector('input');
		this.valid = true;
		this.init();
	}
	init() {
		if (!this.field) return;
		this.field.addEventListener('blur', () => this.validate());
		this.field.addEventListener('focus', () =>
			this.container.classList.remove('input--error')
		);
	}
	validate() {
		const value = this.field.value.trim();
		const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (value && !pattern.test(value)) {
			this.container.classList.add('input--error');
			this.valid = false;
		} else {
			this.container.classList.remove('input--error');
			this.valid = true;
		}
		return this.valid;
	}
}

document.querySelectorAll('.js-input--email').forEach((el) => {
	const instance = new InputEmail(el);
	el._instance = instance;
});
