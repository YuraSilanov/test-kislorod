export default class InputPhone {
	constructor(container) {
		this.container = container;
		this.field = container.querySelector('input');
		this.valid = true;

		this.init();
	}

	init() {
		if (!this.field) return;

		this.field.addEventListener('input', () => this.applyMask());
		this.field.addEventListener('blur', () => this.validate());
		this.field.addEventListener('focus', () =>
			this.container.classList.remove('input--error')
		);
	}

	applyMask() {
		let digits = this.field.value.replace(/\D/g, '');

		if (!digits) {
			this.field.value = '';
			return;
		}
		if (!digits.startsWith('7')) digits = '7' + digits.slice(1);

		let formatted = '+7';
		if (digits.length > 1) formatted += ' ' + digits.slice(1, 4);
		if (digits.length > 4) formatted += ' ' + digits.slice(4, 7);
		if (digits.length > 7) formatted += '-' + digits.slice(7, 9);
		if (digits.length > 9) formatted += '-' + digits.slice(9, 11);

		this.field.value = formatted;
	}

	validate() {
		const digits = this.field.value.replace(/\D/g, '');

		if (!digits) {
			this.container.classList.remove('input--error');
			this.valid = true;
			return true;
		}

		if (digits.length !== 11 || !digits.startsWith('7')) {
			this.container.classList.add('input--error');
			this.valid = false;
		} else {
			this.container.classList.remove('input--error');
			this.valid = true;
		}
		return this.valid;
	}
}

document.querySelectorAll('.js-input--phone').forEach((el) => {
	const instance = new InputPhone(el);
	el._instance = instance;
});
