import '../App.css'
import { Button } from '../components/button';
import { ShareIcon } from '../Icons/shareIcon';
import { PlusIcon } from '../Icons/PlusIcon';
import { SideBar } from '../components/sideBar';
import { Card } from '../components/Card';
import { useState } from 'react';
import { CreateContentModal } from '../components/createContentModal';
import { useContent } from '../hooks/useContent';

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { content } = useContent();  // ✅ Move this here

  return (
    <div>
      <SideBar />
      <div className='p-4 ml-72 min-h-screen bg-gray-100'>
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />

        <div className='flex justify-end gap-4 pt-4'>
          <Button variant='primary' text='Share Brain' startIcon={<ShareIcon />} />
          <Button onClick={() => setModalOpen(true) } variant='secondary' text='Add Content' startIcon={<PlusIcon />} />
        </div>

        {/* ✅ Prevent error if content is undefined */}
        <div className='flex gap-4'>
          {Array.isArray(content) ? (
            content.map(({ type, link, title }) => (
              <Card key={link} type={type} link={link} title={title} />
            ))
          ) : (
            <p>Loading...</p>  // ✅ Display a message if content is not ready
          )}
        </div>
      </div>
    </div>
  );
}
