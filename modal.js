
const modal = document.querySelector('.modal')

export const openModal = (children, callback) => {
 modal.style.display = 'flex'
 if(children){
 modal.appendChild(children)
 }
 callback()
}