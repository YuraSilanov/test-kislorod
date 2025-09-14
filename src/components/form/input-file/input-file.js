export default class InputFile {
	constructor(element) {
		this.el = element;
		this.input = this.el.querySelector('.js-input-file__field');
		this.preview = this.el.querySelector('.js-input-file__preview');
		this.valid = true;

		this.maxSize = 10 * 1024 * 1024;
		this.allowedTypes = ['image/jpeg', 'image/png'];

		this.init();
	}

	init() {
		this.input.addEventListener('change', () => this.handleFiles());
		this.preview.addEventListener('click', (e) => this.handleDelete(e));
	}

	validate() {
		this.handleFiles();
		return this.valid;
	}

	handleFiles() {
		const files = Array.from(this.input.files);

		if (!files.length) {
			this.clear();
			this.valid = true;
			return;
		}

		const invalidFile = files.find(
			(file) => !this.allowedTypes.includes(file.type) || file.size > this.maxSize
		);

		if (invalidFile) {
			this.setError();
			this.valid = false;
			return;
		}

		this.el.classList.remove('input-file--error');
		this.el.classList.add('input-file--active');
		this.valid = true;

		files.forEach((file) => this.addPreview(file));

		this.input.value = '';
	}

	addPreview(file) {
		const reader = new FileReader();
		reader.onload = (e) => {
			const item = document.createElement('div');
			item.className = 'input-file__photo-item js-input-file__photo-item';

			const btn = document.createElement('button');
			btn.className = 'input-file__photo-delete js-input-file__photo-delete';
			btn.type = 'button';

			const img = document.createElement('img');
			img.className = 'input-file__photo';
			img.src = e.target.result;
			img.alt = file.name;

			item.appendChild(btn);
			item.appendChild(img);
			this.preview.appendChild(item);

			if (!this.el.classList.contains('input-file--active')) {
				this.el.classList.add('input-file--active');
			}
		};
		reader.readAsDataURL(file);
	}

	handleDelete(e) {
		const btn = e.target.closest('.js-input-file__photo-delete');
		if (!btn) return;

		const item = btn.closest('.js-input-file__photo-item');
		if (item) {
			item.remove();

			if (!this.preview.querySelector('.js-input-file__photo-item')) {
				this.valid = true;

				this.el.classList.remove('input-file--active', 'input-file--error');
			}
		}
	}

	setError() {
		this.el.classList.remove('input-file--active');
		this.el.classList.add('input-file--error');
		this.preview.innerHTML = '';
	}

	clear() {
		this.el.classList.remove('input-file--active', 'input-file--error');
		this.preview.innerHTML = '';
		this.valid = true;
	}
}

document.querySelectorAll('.js-input-file').forEach((el) => {
	const instance = new InputFile(el);
	el._instance = instance;
});
