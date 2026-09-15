import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo, Button } from '../components/ui'

/**
 * LocationPage — Screen 3
 *
 * Standard Web Implementation:
 *  1. On mount: triggers native browser prompt.
 *  2. While prompt is open (user has not clicked an option):
 *     - Stays on the same page indefinitely.
 *     - Button stays #666666 with spinner spinning.
 *     - Heading: "TRYING TO FETCH YOUR LOCATION..."
 *  3. On user selection:
 *     - "Allow": saves coords -> brief spinner glance -> navigates to /home.
 *     - "Block" (Permission Denied): brief spinner glance -> navigates to /home.
 *  4. In case of network failure or position error (not user block):
 *     - Stays on the page.
 *     - Button returns to normal active white state showing text "ENABLE LOCATION".
 *     - Shows notice: "Taking longer than expected. Please check permissions."
 *     - User can click "ENABLE LOCATION" to re-trigger.
 */
export default function LocationPage() {
  const navigate = useNavigate()
  const [isPrompting, setIsPrompting] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [hasFailed, setHasFailed] = useState(false)

  const triggerNativeLocation = () => {
    setIsPrompting(true)
    setIsDone(false)
    setHasFailed(false)

    if (!navigator.geolocation) {
      setIsPrompting(false)
      setHasFailed(true)
      return
    }

    // No timeout limit so it waits indefinitely until the user actually makes a choice
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // User clicked "Allow"
        sessionStorage.setItem(
          'user_location',
          JSON.stringify({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        )
        setIsPrompting(false)
        setIsDone(true)

        // Brief spinner animation for a glance before navigating
        setTimeout(() => {
          navigate('/home')
        }, 1100)
      },
      (error) => {
        console.log('Browser geolocation event:', error.code, error.message)
        setIsPrompting(false)

        if (error.code === error.PERMISSION_DENIED) {
          // User explicitly selected "Block" / declined the prompt
          // Per requirement: in both accept/decline cases, brief spinner glance then head to next page
          setIsDone(true)
          setTimeout(() => {
            navigate('/home')
          }, 1100)
        } else {
          // In case of any other error or network failure:
          // Stay on the same page, button returns to normal state showing 'Enable Location'
          setHasFailed(true)
          setIsDone(false)
        }
      },
      { enableHighAccuracy: false, timeout: 10000 }
    )
  }

  // Automatically trigger standard browser prompt on mount
  useEffect(() => {
    triggerNativeLocation()
  }, [])

  return (
    <div
      className="relative w-full min-h-dvh flex flex-col justify-between select-none bg-black overflow-y-auto"
      style={{
        paddingLeft: 'clamp(20px, 3.23vw, 62px)',
        paddingRight: 'clamp(20px, 3.23vw, 62px)',
        paddingTop: 'clamp(40px, 10.46vh, 113px)',
        paddingBottom: 'clamp(32px, 15vh, 162px)',
      }}
    >
      <div>
        {/* ── Logo E• at top-left corner ── */}
        <div className="flex items-center">
          <Logo size="sm" />
        </div>

        {/* ── Heading Text Block ── */}
        <div
          style={{
            marginTop: 'clamp(32px, 15.8vh, 171px)',
          }}
        >
          {isPrompting ? (
            /* While native prompt is open and user hasn't made a choice */
            <h1
              className="font-extrabold uppercase leading-tight tracking-tight"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(18px, min(4.2vw, 2.96vh), 32px)',
                color: '#FFFFFF',
              }}
            >
              TRYING TO FETCH YOUR{' '}
              <span style={{ color: '#A855F7' }}>LOCATION</span>...
            </h1>
          ) : (
            /* Default & idle/failure state */
            <h1
              className="font-extrabold uppercase leading-tight tracking-tight"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(18px, min(4.2vw, 2.96vh), 32px)',
                color: '#FFFFFF',
              }}
            >
              WE USE YOUR <span style={{ color: '#A855F7' }}>LOCATION</span> TO
              SUGGEST NEARBY EVENTS.
            </h1>
          )}
        </div>
      </div>

      {/* ── LOWER SECTION: Notice + Button ── */}
      <div
        style={{
          marginTop: 'clamp(24px, 5vh, 60px)',
        }}
      >
        {/* Status notice on failure */}
        {hasFailed && (
          <p
            className="font-normal"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(13px, 1.85vh, 20px)',
              color: '#737373',
              marginBottom: 'clamp(16px, 3.05vh, 33px)',
            }}
          >
            Taking longer than expected. Please check permissions.
          </p>
        )}

        {/* Action Button */}
        {isPrompting ? (
          /* While prompt is active: button stays #666666 with spinner spinning indefinitely */
          <Button
            loading
            disabled
            className="w-full !rounded-[10px] !font-medium"
            style={{
              borderRadius: '10px',
              backgroundColor: '#666666',
              color: '#FFFFFF',
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(15px, 2.22vh, 24px)',
              fontWeight: 500,
              paddingTop: 'clamp(14px, 2.5vh, 27px)',
              paddingBottom: 'clamp(14px, 2.5vh, 27px)',
              lineHeight: 1.2,
            }}
          >
            {''}
          </Button>
        ) : isDone ? (
          /* Brief glance spinner on white button after Allow or Block */
          <Button
            loading
            disabled
            className="w-full !rounded-[10px] !font-medium"
            style={{
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              color: '#000000',
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(15px, 2.22vh, 24px)',
              fontWeight: 500,
              paddingTop: 'clamp(14px, 2.5vh, 27px)',
              paddingBottom: 'clamp(14px, 2.5vh, 27px)',
              lineHeight: 1.2,
            }}
          >
            {''}
          </Button>
        ) : (
          /* Normal state showing text "ENABLE LOCATION" (for retriggering) */
          <Button
            onClick={triggerNativeLocation}
            className="w-full !rounded-[10px] !font-medium"
            style={{
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              color: '#000000',
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(15px, 2.22vh, 24px)',
              fontWeight: 500,
              paddingTop: 'clamp(14px, 2.5vh, 27px)',
              paddingBottom: 'clamp(14px, 2.5vh, 27px)',
              lineHeight: 1.2,
            }}
          >
            Enable Location
          </Button>
        )}
      </div>
    </div>
  )
}
