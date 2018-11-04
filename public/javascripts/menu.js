const trai = document.getElementsByClassName('trai')[0];
		const phai = document.getElementsByClassName('phai')[0];
		const search = document.getElementsByClassName('search')[0];
		const tim = document.getElementsByClassName('tim')[0];
		const back = document.getElementsByClassName('back')[0];
		const formUpload = document.getElementsByClassName('form-upload')[0];

		const ds = document.getElementsByClassName('ds')[0];
		const up = document.getElementsByClassName('up')[0];
		const danhsach__mt = document.getElementsByClassName('danh_sach')[0];

		console.log(ds,up);
tim.onclick=function(){search.classList.add('active');trai.classList.add('active');phai.classList.add('active');}
back.onclick=function(){search.classList.remove('active');trai.classList.remove('active');phai.classList.remove('active');}
const people = document.getElementsByClassName('people')[0];
const cha = document.getElementsByClassName('cha')[0];
const omcon = document.getElementsByClassName('omcon')[0];
const chuyenmuc = document.getElementsByClassName('chuyenmuc')[0];
const upload = document.getElementsByClassName('upload')[0];
people.onclick=function(){people.classList.toggle('active');}
cha.onclick=function(){omcon.classList.toggle('active');cha.classList.toggle('active')}
chuyenmuc.onclick=function(){chuyenmuc.classList.toggle('active')}
upload.onclick=function(){upload.classList.toggle('active')}
const table=document.getElementsByClassName('table')[0];
const form=document.getElementsByClassName('form')[0];
const add=document.getElementsByClassName('add')[0];
const xem=document.getElementsByClassName('xem')[0];

ds.addEventListener('click',anhien);
up.addEventListener('click',hamlol);
function anhien(){
	up.style.display='block';
	ds.style.display='none';
	formUpload.style.display='none';
	danhsach__mt.style.display='block';
}
function hamlol(){
	up.style.display='none';
	ds.style.display='block';
	formUpload.style.display='block';
	danhsach__mt.style.display='none';
}
