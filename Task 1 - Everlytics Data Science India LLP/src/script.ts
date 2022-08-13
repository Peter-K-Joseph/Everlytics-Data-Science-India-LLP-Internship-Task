
const validate = () => {
    let is_missing = false;
    const elements = {
        number: {
            runtime: document.getElementById('runtime'),
        },
        text: {
            pipeline: document.getElementById('pipeline'),
            project: document.getElementById('project'),
            bucket: document.getElementById('bucket'),
            storage_files: document.getElementById('storage_files'),
        },
        dropdown: {
            source: document.querySelector('.dropdownselection.active'),
        }
    }

    const numcheck = (element) => {
        console.log(element.value)
        if (element.getAttribute('type') == 'number') {
            if (element.value == '0')
                return 'Number show be a non zero value'
            if (isNaN(element.value))
                return 'This field must be a number'
            if (element.value == '')
                return 'This field cannot be empty nor contain non numeric values'
        } else {
            console.error("[ERROR] - Form Element is not of type number")
        }
    }

    const alert = (code, element, message) => {
        element = document.querySelector(`#${element}_error`);
        if (code == 0) {
            is_missing = true;
            element.classList.remove("is-link")
            element.classList.add("is-danger");
        } else {
            element.classList.remove("is-danger");
            element.classList.add("is-link")
        }
        element.innerHTML = message
    }

    const inputcheck = (element) => {
        if (element.value == '')
            return 'This field cannot be empty'
        if (element.value.length < 5)
            return 'This field must be at least 5 characters long'
        if (['-', '_', '+'].includes(element.value[0]))
            return 'This field cannot start with -, _ or +'
        if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(element.value))
            return 'This field cannot contain special characters'
    }

    // Checking if the input is empty or not in text based
    for (let i in elements.text) {
        if (inputcheck(elements.text[i])) {
            alert(0, i, inputcheck(elements.text[i]))
        } else {
            alert(1, i, "")
        }
    }

    // Checking if the number is valid
    if (numcheck(elements.number.runtime)) {
        alert(0, "runtime", numcheck(elements.number.runtime))
    } else {
        alert(1, "runtime", "")
    }

    if (elements.dropdown.source == null) {
        alert(0, "source", "Please select a source")
    } else {
        alert(1, "source", "")
    }

    if (!is_missing) {
        swal("Form Validation Alert", "Form Validated!", "success");
    }
}

document.querySelector(".validate").addEventListener("click", validate)
document.querySelectorAll('.dropdownselection').forEach(element => {
    element.addEventListener("click", (e) => {
        console.log("clicked")
        const elements = {
            title: {
                project: {
                    id: document.getElementById('project_name'),
                    text: 'Project Name',
                },
                bucket: {
                    id: document.getElementById('bucket_name'),
                    text: 'Bucket Name',
                },
            }
        }
        setTimeout(() => {
            if (document.querySelector('.dropdownselection.active') == null) return;
            for (let i in elements.title) {
                elements.title[i].id.innerHTML = `${document.querySelector('.dropdownselection.active').getAttribute("data-value")} ${elements.title[i].text}`
            }
        }, 300)
    })
})