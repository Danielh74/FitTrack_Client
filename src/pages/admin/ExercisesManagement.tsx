import { ChangeEvent, useEffect, useRef, useState } from "react"
import { exerciseService } from "../../services/ExerciseService";
import { Exercise, MuscleGroup } from "../../models/Plan";
import { toast, ToastContainer } from "react-toastify";
import { deleteItem, handleApiErrors } from "../../utils/Helpers";
import Loader from "../../components/Loader";
import { MdDelete } from "react-icons/md";
import ExerciseCreationModal from "../../Modals/ExerciseCreationModal";
import { Dropdown } from "flowbite-react";
import { IoIosArrowDown } from "react-icons/io";
import "/src/styles/Toast.scss";
import { FaRegCirclePlay } from "react-icons/fa6";
import ExerciseVideoModal from "../../Modals/ExerciseVideoModal";
import { FiPlus } from "react-icons/fi";

function ExercisesManagement() {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [muscleGroups, setMuscleGroups] = useState<MuscleGroup[]>([]);
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [openVideo, setOpenVideo] = useState(false);
    const [videoURL, setVideoURL] = useState("");
    const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            exerciseService.getAllExercises(),
            exerciseService.getAllMuscleGroups()
        ]).then(([exercisesResponse, muscleGroupsResponse]) => {
            setExercises(exercisesResponse.data);
            setMuscleGroups(muscleGroupsResponse.data);
        }).catch((error) => {
            const errorMsg = handleApiErrors(error);
            toast.error(errorMsg, {

            });
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    const handleExerciseCreate = (exercise: Exercise) => {
        const updatedExercises = [...exercises, exercise];
        setExercises(updatedExercises);
        toast.success("Exercise created successfully!");
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, exercise: Exercise) => {
        const videoFile = e.target.files[0];
        if (videoFile) {
            const dataToUpdate = {
                id: exercise.id,
                name: exercise.name,
                muscleGroupName: exercise.muscleGroupName,
                videoFile: videoFile
            }

            exerciseService.updateExercise(dataToUpdate)
                .then(response => {
                    const updatedEx: Exercise = response.data;
                    setExercises(exercises.map(ex => (ex.id === updatedEx.id ? updatedEx : ex)));
                    toast.success("Exercise updated successfully");
                }).catch(err => {
                    const errorMsg = handleApiErrors(err);
                    toast.error(errorMsg);
                })
        }
    };

    const handleExerciseDelete = (id: number) => {
        setIsLoading(true)
        exerciseService.deleteExercise(id).then((response) => {
            const updatedList = exercises.filter(ex => ex.id !== id);
            setExercises(updatedList);
            toast.success(response.data);
        }).catch((error) => {
            const errorMsg = handleApiErrors(error);
            toast.error(errorMsg);
        }).finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <div className="relative">
            {isLoading && (
                <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-70 z-10">
                    <Loader />
                </div>
            )}
            <button className="dark:bg-customGreen bg-green-500 font-medium py-1 px-2 rounded-md" onClick={() => setShowModal(true)}>ADD</button>
            <div className="overflow-x-auto w-full rounded-md border mt-2 border-gray-300 shadow-md dark:border-black">
                <table className="w-full text-sm text-center font-medium dark:text-white">
                    <thead className="bg-gray-200 dark:bg-dropDownBg uppercase border-b">
                        <tr>
                            <th className="flex justify-center py-3">
                                <Dropdown
                                    dismissOnClick={true}
                                    className="dark:bg-dropDownBg"
                                    renderTrigger={() =>
                                        <button className="flex items-center gap-2">{selectedMuscleGroup ? selectedMuscleGroup : "Muscle groups"}
                                            <IoIosArrowDown color="white" />
                                        </button>}>
                                    <Dropdown.Item onClick={() => setSelectedMuscleGroup("")} className="dropdown-item">Muscle Groups</Dropdown.Item>
                                    {muscleGroups.map(mg =>
                                        <Dropdown.Item key={mg.id} onClick={() => setSelectedMuscleGroup(mg.name)} className="dropdown-item">{mg.name}</Dropdown.Item>)}
                                </Dropdown>
                            </th>
                            <th className="py-1">Exercise</th>
                            <th className="py-1">Video</th>
                            <th className="py-1">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedMuscleGroup
                            ? exercises.map(ex => ex.muscleGroupName === selectedMuscleGroup &&
                                <tr
                                    key={ex.id}
                                    className="odd:bg-white even:bg-gray-100 odd:dark:bg-mediumBg even:dark:bg-darkBg border-t dark:border-black"
                                >
                                    <td className="px-4 py-3">
                                        {ex.muscleGroupName}
                                    </td>
                                    <td className="px-4 py-3">
                                        {ex.name}
                                    </td>
                                    <td className="px-4 py-3 text-xl justify-items-center">
                                        {ex.videoURL ?
                                            <button onClick={() => { setOpenVideo(true); setVideoURL(ex.videoURL) }}>
                                                <FaRegCirclePlay />
                                            </button>
                                            :
                                            <div className="flex">
                                                <input
                                                    type="file"
                                                    accept='video/*'
                                                    id={`file-input-${ex.id}`}
                                                    ref={(el) => (fileInputRefs.current[ex.id] = el)}
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileChange(e, ex)}
                                                    className="hidden" />
                                                <button onClick={() => fileInputRefs.current[ex.id]?.click()} >
                                                    <FiPlus />
                                                </button>
                                            </div>
                                        }
                                    </td>
                                    <td>
                                        <button onClick={() => deleteItem("exercise", handleExerciseDelete, ex.id)}>
                                            <MdDelete className="text-xl hover:text-2xl hover:text-customRed transition-all duration-75" />
                                        </button>
                                    </td>
                                </tr>

                            )
                            : exercises.map(ex =>
                                <tr
                                    key={ex.id}
                                    className="odd:bg-white even:bg-gray-100 odd:dark:bg-mediumBg even:dark:bg-darkBg border-t dark:border-black"
                                >
                                    <td className="px-4 py-3">
                                        {ex.muscleGroupName}
                                    </td>
                                    <td className="px-4 py-3">
                                        {ex.name}
                                    </td>
                                    <td className="flex justify-center px-4 py-3 text-xl justify-items-center">
                                        {ex.videoURL ?
                                            <button onClick={() => { setOpenVideo(true); setVideoURL(ex.videoURL) }}>
                                                <FaRegCirclePlay />
                                            </button>
                                            :
                                            <div className="flex">
                                                <input
                                                    type="file"
                                                    accept='video/*'
                                                    id={`file-input-${ex.id}`}
                                                    ref={(el) => (fileInputRefs.current[ex.id] = el)}
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileChange(e, ex)}
                                                    className="hidden" />
                                                <button onClick={() => fileInputRefs.current[ex.id]?.click()} >
                                                    <FiPlus />
                                                </button>
                                            </div>
                                        }
                                    </td>
                                    <td>
                                        <button onClick={() => deleteItem("exercise", handleExerciseDelete, ex.id)}>
                                            <MdDelete className="text-xl hover:text-2xl hover:text-customRed transition-all duration-75" />
                                        </button>
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
            <ExerciseCreationModal
                show={showModal}
                onClose={() => setShowModal(false)}
                muscleGroups={muscleGroups}
                exercises={exercises}
                onCreate={handleExerciseCreate}
            />
            <ExerciseVideoModal
                show={openVideo}
                onClose={() => setOpenVideo(false)}
                videoURL={videoURL}
            />
        </div>
    );
};

export default ExercisesManagement;