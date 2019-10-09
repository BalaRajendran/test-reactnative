package com.whatsappanalysis;

import android.app.Application;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;
import com.sbugert.rnadmob.RNAdMobPackage;
import com.sbugert.rnadmob.RNAdMobPackage;
import com.horcrux.svg.SvgPackage;
import cl.json.RNSharePackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage; 
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
import io.invertase.firebase.perf.RNFirebasePerformancePackage; 
// import com.rnfs.RNFSPackage;
import io.github.elyx0.reactnativedocumentpicker.DocumentPickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      packages.add(new RNFirebaseAnalyticsPackage());
      packages.add(new RNFirebaseStoragePackage());
      packages.add(new RNFirebasePerformancePackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
