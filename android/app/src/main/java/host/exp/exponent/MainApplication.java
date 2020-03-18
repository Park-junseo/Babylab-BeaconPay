package host.exp.exponent;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.util.Base64;
import android.util.Log;

import com.facebook.react.ReactPackage;

import org.unimodules.core.interfaces.Package;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.List;

import expo.loaders.provider.interfaces.AppLoaderPackagesProviderInterface;
import host.exp.exponent.generated.BasePackageList;
import okhttp3.OkHttpClient;

// Needed for `react-native link`
// import com.facebook.react.ReactApplication;
import com.solinor.bluetoothstatus.RNBluetoothManagerPackage;
import com.reactnativecommunity.rnpermissions.RNPermissionsPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.dooboolab.naverlogin.RNNaverLoginPackage;
import com.dooboolab.kakaologins.RNKakaoLoginsPackage;

import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;

import com.burnweb.rnsendintent.RNSendIntentPackage;

public class MainApplication extends ExpoApplication implements AppLoaderPackagesProviderInterface<ReactPackage> {

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  // Needed for `react-native link`
  public List<ReactPackage> getPackages() {

    return Arrays.<ReactPackage>asList(
        // Add your own packages here!
        // TODO: add native modules!

        // Needed for `react-native link`
        // new MainReactPackage(),
            new RNBluetoothManagerPackage(),
            new RNPermissionsPackage(),
           

            new SplashScreenReactPackage(),
            new RNNaverLoginPackage(),
            new RNKakaoLoginsPackage(),
            new RNGoogleSigninPackage(),
            new ReactNativeRestartPackage(),
            new RNSendIntentPackage()
    );
  }

  public List<Package> getExpoPackages() {
    return new BasePackageList().getPackageList();
  }

  @Override
  public String gcmSenderId() {
    return getString(R.string.gcm_defaultSenderId);
  }

  public static OkHttpClient.Builder okHttpClientBuilder(OkHttpClient.Builder builder) {
    // Customize/override OkHttp client here
    return builder;
  }
}
