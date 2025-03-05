export type State = {
  playlist: Song[]
  currentTrackIndex: number
  showPlaylist: boolean
  isPlaying: boolean
}

type Action =
  | {type: 'GO_PREV_SONG'}
  | {type: 'GO_NEXT_SONG'}
  | {type: 'GO_TO_SONG'; payload: number}
  | {type: 'TOGGLE_PLAYLIST_VISIBLE'}
  | {type: 'IS_PLAYING'; payload: boolean}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'GO_PREV_SONG':
      return {
        ...state,
        currentTrackIndex:
          state.currentTrackIndex === 0
            ? state.playlist.length - 1
            : state.currentTrackIndex - 1
      }

    case 'GO_NEXT_SONG':
      return {
        ...state,
        currentTrackIndex:
          state.currentTrackIndex + 1 >= state.playlist.length
            ? 0
            : state.currentTrackIndex + 1
      }

    case 'GO_TO_SONG':
      return {
        ...state,
        currentTrackIndex: action.payload - 1
      }

    case 'TOGGLE_PLAYLIST_VISIBLE':
      return {
        ...state,
        showPlaylist: !state.showPlaylist
      }

    case 'IS_PLAYING':
      return {
        ...state,
        isPlaying: action.payload
      }

    default:
      throw new Error('Unknown action type')
  }
}

export {reducer}
