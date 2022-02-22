/**
 * Get elements form html
 */ 
const skills = document.querySelector('#skill_list');
const devs_add_form = document.querySelector('#devs_add_form');
const devs_edit_form = document.querySelector('#devs_edit_form');
const devs_data_list = document.querySelector('#devs_data_list');
const devs_edit_btns = document.querySelectorAll('.devs_edit_btn');



/**
 * Load all skills form api
 */
function loadSkills  () {
    axios.get('http://localhost:5151/skills').then(skill => {

        let skill_list = '';
        skill.data.map(skill => {
            skill_list += `
                <option value="${ skill.id }">${ skill.name }</option>
            `;
        }); 
        skills.insertAdjacentHTML('beforeend', skill_list);

    });

}
loadSkills();


/**
 * All devs load form api 
 */
getDevelopers();
function getDevelopers() {
    
    axios.get('http://localhost:5151/developers').then(res => {
        let dev_data = '';
        res.data.map((dev, index) => {
            dev_data += `
            <tr class ="text-center">
                <td>${ index + 1 }</td>
                <td>${ dev.name }</td>
                <td>${ dev.email }</td>
                <td>${ dev.mobile }</td>

                <td><img style="object-fit:cover; width:50px;height:50px;" src="${ dev.photo }" alt=""></td>
                <td>            
                    <a data-bs-toggle="modal" class="btn btn-info btn-sm" onclick="devsLoad(${dev.id})" href="#modal_view"><i class="fa fa-eye"></i></a>

                    <a data-bs-toggle="modal" class="btn btn-warning btn-sm" onclick="editDeveloper(${ dev.id })"  href="#modal_edit"><i class="fa fa-edit"></i></a>
                    <a onclick="deleteDevs(${dev.id})" class="btn btn-danger btn-sm" href="#"><i class="fa fa-trash"></i></a>
                    
                </td>
            </tr>
            `;
        });

        devs_data_list.innerHTML = dev_data;

    });

}

/**
 * View single data form api
 */

function devsLoad(id) {

    const single_dev = document.querySelector('.dev_single')

    single_dev.innerHTML = '';
    
    axios.get(`http://localhost:5151/developers/${id}`).then(data => {
        
        single_dev.innerHTML = `
        <div class="row text-center">
		    <div class="col-md-6">
				<img class="w-100" style = "width: 250px; height:250px; object-fit: cover"; src="${data.data.photo}" alt="not found">
			</div>
			<div class="col-md-6 text-center">
				<h3 class="margin:50px">${data.data.name}</h3>
				<h6>${data.data.email}</h6>
				<h6>${data.data.mobile}</h6>
				<p>${data.data.skillId}</p>
				<a class="btn btn-info" href="#">Add to cart</a>
			</div>
		</div>
        `;
        
    });

};
/**
 * To delete single data form api
 */
function deleteDevs(id){
    let conf = confirm('Are you sure ?');

    if (conf) {
        axios.delete(`http://localhost:5151/developers/${id}`).then(res => {
            getDevelopers();
        }) 
    } else{
        return false;
    }      
}

/**
 * Add new devs for api
 */
 devs_add_form.addEventListener('submit', function(e){
    e.preventDefault();

    let name = this.querySelector('#name');
    let email = this.querySelector('#email');
    let mobile = this.querySelector('#mobile');
    let photo = this.querySelector('#photo');
    let skill = this.querySelector('#skill_list');


    if( name.value == '' || email.value == '' || skill.value == '' ){
        alert('All fields are required !');
    }else {

        axios.post('http://localhost:5151/developers', {
            id : "",
            name : name.value, 
            email: email.value,
            mobile: mobile.value,
            photo : photo.value, 
            skillId : skill.value
        }).then( res =>  {

            name.value = '';
            email.value = '';
            mobile.value = '';
            photo.value = '';
            skill.value = '';

            getDevelopers();

        });      

    }

});

 /**
  * Develoeprs data Edit form api
  */
function editDeveloper(id){

    let name = document.getElementById('ename');
    let email = document.getElementById('eemail');
    let mobile = document.getElementById('emobile');
    let photo = document.getElementById('ephoto');
    let skill = document.getElementById('eskill_list');
    let preview = document.getElementById('epreview');
    let edit_id = document.getElementById('edit_id');

    axios.get(`http://localhost:5151/developers/${id}`).then(res => {

        name.value = res.data.name;
        email.value = res.data.email;
        mobile.value = res.data.mobile;
        photo.value = res.data.photo;
        skill.value = res.data.skillId;
        edit_id.value = id;
        preview.setAttribute('src', res.data.photo);

    });
}

devs_edit_form.addEventListener('submit', function(e){
    e.preventDefault();

    let name = this.querySelector('#ename');
    let email = this.querySelector('#eemail');
    let mobile = this.querySelector('#emobile');
    let photo = this.querySelector('#ephoto');
    let skill = this.querySelector('#eskill_list');
    let edit_id = this.querySelector('#edit_id');


    axios.patch(`http://localhost:5151/developers/${edit_id.value}`, {
            id : "",
            name : name.value, 
            email: email.value,
            mobile: mobile.value,
            photo : photo.value, 
            skillId : skill.value
    }).then(res => {
        name.value = '';
        email.value = '';
        mobile.value = '';
        photo.value = '';
        skill.value = '';

        getDevelopers();

    });

});

