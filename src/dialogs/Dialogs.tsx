import Swal from "sweetalert2"

const showSuccessAlert = (message: string) => {
    return Swal.fire({
        icon: "success",
        title: "Success",
        text: message,
        timer: 2000
    })
};

const showErrorAlert = (message: string) => {
    return Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
        timer: 2000
    })
};

const showDeleteAlert = (message: string, deleteFunc: (id?: number) => void, id?: number) => {
    const darkMode = localStorage.getItem("theme");
    return Swal.fire({
        title: "Are you sure?",
        color: darkMode === 'dark' ? "#FFD700" : "black",
        text: message,
        icon: "warning",
        iconColor: darkMode === 'dark' ? "#FF6600" : "red",
        background: darkMode === 'dark' ? "#2E2E2E" : "white",
        showCancelButton: true,
        confirmButtonColor: darkMode === 'dark' ? "#FF6600" : "red",
        cancelButtonColor: "#808080",
        confirmButtonText: "Delete"
    }).then((result) => {
        if (result.isConfirmed) {
            deleteFunc(id);
        }
    });
};

const showAddAlert = async () => {
    const { value: name } = await Swal.fire({
        title: "Enter Name",
        input: "text",
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return "You need to write something!";
            }
        }
    });
    if (name) {
        return name;
    }

}

export const dialogs = { SuccessAlert: showSuccessAlert, errorAlert: showErrorAlert, deleteAlert: showDeleteAlert, addAlert: showAddAlert };