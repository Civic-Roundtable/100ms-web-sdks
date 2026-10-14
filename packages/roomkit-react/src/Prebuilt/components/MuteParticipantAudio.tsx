import React from 'react';
import {
  HMSPeerID,
  selectAudioTrackByPeerID,
  selectLocalPeerID,
  useHMSStore,
  useRemoteAVToggle,
} from '@100mslive/react-sdk';
import { MicOffIcon, MicOnIcon } from '@100mslive/react-icons';
// @ts-ignore: No implicit Any
import { ToastManager } from './Toast/ToastManager';
import { Dropdown } from '../../Dropdown';
import { Text } from '../../Text';

const handleError = (err: Error) => {
  ToastManager.addToast({ title: err.message, variant: 'error' });
};

/**
 * Dropdown item that lets a host mute (or request to unmute) a remote participant's audio.
 * Renders nothing for the local peer, for peers without an audio track, or when the local
 * peer lacks the relevant mute/unmute permission.
 */
export const MuteParticipantAudio = ({ peerId }: { peerId: HMSPeerID }) => {
  const localPeerId = useHMSStore(selectLocalPeerID);
  const audioTrackId = useHMSStore(selectAudioTrackByPeerID(peerId))?.id ?? '';
  const { isAudioEnabled, toggleAudio } = useRemoteAVToggle(audioTrackId, '', handleError);

  if (peerId === localPeerId || !toggleAudio) {
    return null;
  }
  return (
    <Dropdown.Item
      css={{ bg: '$surface_default' }}
      onClick={toggleAudio}
      data-testid={isAudioEnabled ? 'mute_audio_participant_list_btn' : 'unmute_audio_participant_list_btn'}
    >
      {isAudioEnabled ? <MicOffIcon /> : <MicOnIcon />}
      <Text variant="sm" css={{ ml: '$4', fontWeight: '$semiBold', c: '$on_surface_high' }}>
        {isAudioEnabled ? 'Mute Audio' : 'Request to Unmute Audio'}
      </Text>
    </Dropdown.Item>
  );
};
