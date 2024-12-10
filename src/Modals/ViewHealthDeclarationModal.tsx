import { Modal } from 'flowbite-react'
import "../styles/Form.scss";
import { HealthDeclaration, User } from '../models/User';
import { deleteItem, handleApiErrors } from '../utils/Helpers';
import { healthDecService } from '../services/HealthDeclarationService';
import { useState } from 'react';
import useAdmin from '../hooks/useAdmin';

type Props = {
    show: boolean;
    onClose: () => void;
    healthDec: HealthDeclaration;
    updateUser: (updatedUser: User) => void;
    user: User;
}

const ViewHealthDeclarationModal = ({ show, onClose, healthDec, user, updateUser }: Props) => {
    const [error, setError] = useState("");
    const { users, reloadUsers } = useAdmin();

    const handleHealthDecDelete = (id: number) => {
        healthDecService.deleteHealthDec(id).then(() => {
            const updatedUser: User = { ...user, healthDeclarationId: null };
            const updatedUserList = users.map(u => {
                if (u.id === user.id) {
                    return { ...u, healthDeclarationId: null };
                }
                return u;
            });
            updateUser(updatedUser);
            reloadUsers(updatedUserList);
            onClose();
        }).catch((error) => {
            const errorMsg = handleApiErrors(error);
            setError(errorMsg);
        })
    };

    return (
        <Modal show={show} onClose={onClose}>
            <Modal.Header className='dark:bg-dropDownBg'><span className='text-2xl text-customGold'>Health declaration</span></Modal.Header>
            <Modal.Body className='dark:bg-dropDownBg py-1'>
                {healthDec &&
                    <div className="flex-col items-center my-1 dark:text-white">
                        <div className='flex justify-between'>
                            <span className="p-1">Do you suffer from heart disease?</span>
                            <span className="inline-flex items-center gap-1">
                                {healthDec.heartDisease ? "Yes" : "No"}
                            </span>
                        </div>
                        <div className='flex justify-between'>
                            <span className="p-1">Do you suffer from chest pain while in rest?</span>
                            <span className="inline-flex items-center gap-1">
                                {healthDec.chestPainInRest ? "Yes" : "No"}
                            </span>
                        </div>
                        <div className='flex justify-between'>
                            <span className="p-1">Do you suffer from chest pain in daily routines?</span>
                            <span className="inline-flex items-center gap-1">
                                {healthDec.chestPainInDaily ? "Yes" : "No"}
                            </span>
                        </div>
                        <div className='flex justify-between'>
                            <span className="p-1">Do you suffer from chest pain while working out?</span>
                            <span className="inline-flex items-center gap-1">
                                {healthDec.chestPainInActivity ? "Yes" : "No"}
                            </span>
                        </div>
                        <div className='flex justify-between'>
                            <span className="p-1">Have you lost balance due to dizziness in the past year?</span>
                            <span className="inline-flex items-center gap-1">
                                {healthDec.dizzy ? "Yes" : "No"}
                            </span>
                        </div>
                        <div className='flex justify-between'>
                            <span className="p-1">Have you lost consciousness in the past year?</span>
                            <span className="inline-flex items-center gap-1">
                                {healthDec.lostConsciousness ? "Yes" : "No"}
                            </span>
                        </div>
                        <div className='flex justify-between'>
                            <span className="p-1">Have you got treatment for asthma in the past 3 months?</span>
                            <span className="inline-flex items-center gap-1">
                                {healthDec.asthmaTreatment ? "Yes" : "No"}
                            </span>
                        </div>
                        <div className='flex justify-between'>
                            <span className="p-1">Have you suffered from short breath in the past 3 months?</span>
                            <span className="inline-flex items-center gap-1">
                                {healthDec.shortBreath ? "Yes" : "No"}
                            </span>
                        </div>
                        <div className='flex justify-between'>
                            <span className="p-1">Did one of your close family members died from a heart disease?</span>
                            <span className="inline-flex items-center gap-1">
                                {healthDec.familyDeathHeartDisease ? "Yes" : "No"}
                            </span>
                        </div>
                        <div className='flex justify-between'>
                            <span className="p-1">Did one of your close family members died suddenly at a early age?</span>
                            <span className="inline-flex items-center gap-1">
                                {healthDec.familySuddenEarlyAgeDeath ? "Yes" : "No"}
                            </span>
                        </div>
                        <div className='flex justify-between'>
                            <span className="p-1">Did your doctor tell you in the past 5 years to train under supervision?</span>
                            <span className="inline-flex items-center gap-1">
                                {healthDec.trainUnderSupervision ? "Yes" : "No"}
                            </span>
                        </div>
                        <div className='flex justify-between'>
                            <span className="p-1">Do you suffer from chronic illness?</span>
                            <span className="inline-flex items-center gap-1">
                                {healthDec.chronicIllness ? "Yes" : "No"}
                            </span>
                        </div>
                        <div className='flex justify-between'>
                            <span className="p-1">Are you pregnant?</span>
                            <span className="inline-flex items-center gap-1">
                                {healthDec.isPregnant ? "Yes" : "No"}
                            </span>
                        </div>
                    </div>
                }
            </Modal.Body>
            <Modal.Footer className='h-10 dark:bg-dropDownBg justify-center'>
                <button className='dark:bg-customRed p-1 rounded-md font-medium' onClick={() => deleteItem("Health declaration", handleHealthDecDelete, healthDec.id)}>Delete</button>
                {error && <div>{error}</div>}
            </Modal.Footer>
        </Modal>
    )
}

export default ViewHealthDeclarationModal