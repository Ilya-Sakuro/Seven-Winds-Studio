import { useState } from 'react';
import { useCreateEntityMutation } from 'redux/apiSlice';

export const CreateEntity = () => {
    const [createEntity, { data, error, isLoading }] = useCreateEntityMutation();
    const [entityId, setEntityId] = useState<string | null>(null);
    const handleCreateEntity = async () => {
        try {
            const result = await createEntity().unwrap();
            setEntityId(result.eID);
        } catch (err) {
            console.error('Failed to create entity:', err);
        }
    };

    return (
        <div>
            <h1>Create Entity</h1>
            <button onClick={handleCreateEntity} disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Entity'}
            </button>
            {error && <p>Error: {error.toString()}</p>}
            {entityId && <p>Entity ID: {entityId}</p>}
        </div>
    );
};
