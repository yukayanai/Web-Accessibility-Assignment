console.log('parcel works')

import '@fortawesome/fontawesome-free/css/all.css'

document.addEventListener('DOMContentLoaded', function (event) {
	const $ = (selector, $parent = document) => $parent.querySelector(selector)
	const $$ = (selector, $parent = document) =>
		Array.prototype.slice.call($parent.querySelectorAll(selector))

	const $hamburger = $('#hamburger')
	const $navDialog = $('#nav-dialog')

	$hamburger.addEventListener('click', (e) => {
		$navDialog.classList.add('open')
	})
})
