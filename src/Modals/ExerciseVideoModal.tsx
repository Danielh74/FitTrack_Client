import { Modal } from 'flowbite-react'
import "../styles/Form.scss";

type Props = {
    show: boolean;
    onClose: () => void;
    videoURL: string
}

const ExerciseVideoModal = ({ show, videoURL, onClose }: Props) => {
    return (
        <Modal show={show} onClose={onClose} size='xl'>
            <div >
                <Modal.Header className=' bg-white p-0 border-0'></Modal.Header>
                <Modal.Body className='dark:bg-dropDownBg p-0'>
                    <video autoPlay={true} controls loop={true} className='w-full aspect-square object-cover'>
                        <source src={videoURL} type='video/mp4' />
                    </video>
                </Modal.Body>
            </div>

        </Modal>
    )
}

export default ExerciseVideoModal