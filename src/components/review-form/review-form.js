import InputFile from '@/components/form/input-file/input-file.js'; // если InputFile в отдельном файле

document.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector('.js-review-form');

	// --- Инициализация всех input-file ---
	document.querySelectorAll('.js-input-file').forEach((el) => {
		const instance = new InputFile(el);
		el._instance = instance; // <--- хук
	});

	// --- submit формы ---
	form.addEventListener('submit', (e) => {
		e.preventDefault();

		let valid = true;

		form.querySelectorAll('.js-input-file').forEach((fileEl) => {
			if (fileEl._instance && !fileEl._instance.valid) {
				valid = false;
			}
		});

		if (!valid) {
			return;
		}

		console.log('Форма валидна, отправляем...');
		form.submit();
	});
});
