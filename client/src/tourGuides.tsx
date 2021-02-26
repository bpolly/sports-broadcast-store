import ReactJoyride, { Placement } from 'react-joyride'

const topPlacement: Placement = 'top'
const leftPlacement: Placement = 'left'

const dashboardTourGuide = (): ReactElement => {
  const stepsMe = [
    {
      target: 'body',
      content:
        'Welcome to Sportcasts! Let us show you some of the useful things you can do as a Sportcasts member.',
      disableBeacon: true,
    },
    {
      target: '#favorite-team-select-container',
      content:
        'Add your favorite teams here - any games featuring them will standout with a star ⭐️ icon in the game table ->. Try it out!',
      placement: topPlacement,
    },
    {
      target: '#navbar-email-dropdown',
      content:
        'You can setup notifications when your favorite teams play. Hover this link, select "Notification Preferences" and receive emails, text messages, or both when it\'s kickoff, tip-off, or first pitch!',
      placement: leftPlacement,
    },
  ]

  return (
    <ReactJoyride
      steps={stepsMe}
      run={false} // disable for now
      continuous={true}
      showProgress
      showSkipButton={true}
      styles={{
        options: {
          primaryColor: '#fc6167',
          zIndex: 1000,
        },
      }}
    />
  )
}

export { dashboardTourGuide }
