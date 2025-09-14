document.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector('.js-review-form');

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		let isValid = true;

		form.querySelectorAll('.js-review-form__validation').forEach((el) => {
			if (el._instance) {
				el._instance.validate();
				if (!el._instance.valid) {
					isValid = false;
				}
			}
		});
		if (!isValid) {
			return;
		}

		form.classList.add('review-form--success');
	});
});
