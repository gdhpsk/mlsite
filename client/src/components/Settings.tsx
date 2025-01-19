'use client';
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from 'react-bootstrap';
import { getAuth, sendPasswordResetEmail, verifyBeforeUpdateEmail } from 'firebase/auth';

const Settings: React.FC = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
      <button className='hidden' id="settings-form-button"></button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle text-center w-full">User Settings</Dialog.Title>
          <div className="grid place-items-center gap-4 mt-4">
            <p><strong>Name:</strong> {getAuth().currentUser.displayName}</p>
            <p><strong>Email:</strong> {getAuth().currentUser.email}</p>
            {!getAuth().currentUser.emailVerified && (
              <p className="text-red-500">Your email is not verified. Please check your inbox for a verification email.</p>
            )}
            <Button variant="primary" onClick={() => {
              sendPasswordResetEmail(getAuth(), getAuth().currentUser.email)
                .then(() => {
                  alert("Password reset email sent! Check your inbox.")
                })
                .catch((error) => {
                  alert("Error sending password reset: " + error.message)
                });
            }}>
              Reset Password
            </Button>
            <Button variant="primary" onClick={() => {
              const newEmail = prompt("Enter new email address:");
              if (newEmail) {
                verifyBeforeUpdateEmail(getAuth().currentUser, newEmail)
                  .then(() => {
                    alert("Verification email sent to new address. Please check your inbox.")
                  })
                  .catch((error) => {
                    alert("Error updating email: " + error.message)
                  });
              }
            }}>
              Change Email
            </Button>
            <Button variant="info" onClick={() => {
              getAuth().currentUser.getIdToken()
                .then((token) => {
                  alert("Your Firebase token is:\n\n" + token);
                })
                .catch((error) => {
                  alert("Error getting token: " + error.message);
                });
            }}>
              Show Auth Token
            </Button>
            <Button variant="danger" onClick={() => {
              getAuth().signOut()
              window.location.reload()
            }}>
              Logout
            </Button>
            <Dialog.Close asChild>
              <Button variant="secondary">Close</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Settings;
